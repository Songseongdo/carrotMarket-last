import db from '@/lib/db';
import { Prisma } from '@/lib/generated/prisma';
import getSession from '@/lib/session';
import { unstable_cache as NextCache } from 'next/cache';

export async function getTweetInfo(id: number) {
  const tweet = db.tweet.findUnique({
    where: {
      id,
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
  });
  return tweet;
}

export type TweetType = Prisma.PromiseReturnType<typeof getTweetInfo>;

export async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }

  return false;
}

export async function getTweetUserInfo(userId: number) {
  if (!userId) {
    return null;
  }

  return db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export const getCachedtweetInfo = NextCache(
  async (id: number) => getTweetInfo(id),
  ['tweet-info'],
  {
    tags: ['tweets'],
    revalidate: 30,
  },
);
export const getCachedtweetUserInfo = NextCache(
  async (id: number) => getTweetUserInfo(id),
  ['tweet-userinfo'],
  { tags: ['tweets'], revalidate: 30 },
);
