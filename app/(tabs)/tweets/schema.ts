import { z } from 'zod';

export const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
});

export const replySchema = z.object({
  reply: z.string(),
  url: z.string().optional(),
});
export type ReplyType = z.infer<typeof replySchema>;

export const latestReplySchema = z.object({
  reply: z.string(),
  url: z.string().optional(),
  userId: z.string(),
  tweetId: z.string(),
});
export type LatestTweetType = z.infer<typeof latestReplySchema>;
