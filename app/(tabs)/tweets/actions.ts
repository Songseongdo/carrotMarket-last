'use server';

import { TWEET_PAGE_SIZE } from '@/lib/consts';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { FormActionResult } from '@/util';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';
import { latestReplySchema } from './schema';
import { Prisma } from '@/lib/generated/prisma';
import { revalidateTag } from 'next/cache';
import { use } from 'react';

const s3 = new S3Client({
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CF_R2_SECRET_KEY!,
  },
});

const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
});

export async function getSignedUploadUrl(data: FormData) {
  const parsed = uploadSchema.safeParse({
    filename: data.get('filename'),
    contentType: data.get('contentType'),
  });

  if (!parsed.success) return { error: 'Invalid input' };

  const { filename, contentType } = parsed.data;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: filename,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

  return { url: signedUrl };
}

export async function getMoreTweets(page: number) {
  const tweets = db.tweet.findMany({
    orderBy: {
      create_at: 'desc',
    },
    include: {
      Like: {
        select: {
          id: true,
          userId: true,
        },
      },
      Response: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
    skip: (page - 1) * TWEET_PAGE_SIZE,
    take: TWEET_PAGE_SIZE,
  });
  return tweets;
}

const tweetSchema = z.object({
  comment: z.string(),
  url: z.string(),
});

export async function uploadTweet(prevState: any, formData: FormData): Promise<FormActionResult> {
  const data = {
    comment: formData.get('comment'),
    url: formData.get('url'),
  };

  const result = await tweetSchema.spa(data);
  if (result.success) {
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.comment,
        photo: result.data.url,
      },
      select: {
        id: true,
      },
    });
    if (tweet) {
      return { success: true };
    } else {
      return {
        success: false,
        fieldErrors: { comment: [''] },
      };
    }
  } else {
    return {
      success: false,
      fieldErrors: { comment: [''] },
    };
  }
}

export async function uploadReply(formData: FormData): Promise<FormActionResult> {
  const data = {
    reply: formData.get('reply'),
    url: formData.get('url'),
    userId: formData.get('userId'),
    tweetId: formData.get('tweetId'),
  };

  const result = await latestReplySchema.spa(data);
  if (result.success) {
    const reply = await db.response.create({
      data: {
        comment: result.data.reply,
        photo: result.data.url,
        userId: +result.data.userId,
        tweetId: +result.data.tweetId,
      },
      select: {
        id: true,
      },
    });
    if (reply) {
      revalidateTag('tweets');

      return { success: true };
    } else {
      return {
        success: false,
        fieldErrors: { comment: [''] },
      };
    }
  } else {
    return {
      success: false,
      fieldErrors: { comment: [''] },
    };
  }
}

export async function getUserInfo() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
  return user;
}
export type UserInfoType = Prisma.PromiseReturnType<typeof getUserInfo>;

export async function getReplyInfo(id: number) {
  const reply = await db.response.findUnique({
    where: {
      id: id,
    },
    include: {
      tweet: true,
      user: true,
    },
  });
  return reply;
}
export type ReplyType = Prisma.PromiseReturnType<typeof getReplyInfo>;

export async function setUnlike(id: number) {
  const like = await db.like.delete({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
  if (like) {
    revalidateTag('tweets');
  }
  return like;
}
export async function setLike(userId: number, tweetId: number) {
  const like = await db.like.create({
    data: {
      userId: userId,
      tweetId: tweetId,
    },
    select: {
      id: true,
    },
  });
  if (like) {
    revalidateTag('tweets');
  }
  return like;
}
