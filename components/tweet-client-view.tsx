'use client';

import { useOptimistic } from 'react';
import ListTweet from './list-tweet';
import Reply from './reply';
import { TweetType } from '@/app/(tabs)/tweets/[id]/actions';

export default function TweetClientView({ tweetInfo }: { tweetInfo: TweetType }) {
  const [optimisticReplies, addOptimisticReply] = useOptimistic(
    tweetInfo?.Response.length!,
    (count, flag: boolean) => (flag ? count + 1 : count),
  );

  if (!tweetInfo?.id) return null;

  return (
    <>
      <ListTweet {...tweetInfo} replyCount={optimisticReplies} />
      <div className="w-full mt-5">
        <Reply tweetId={tweetInfo?.id!} callSumit={() => addOptimisticReply(true)} />
      </div>
    </>
  );
}
