'use client';

import { InitialTweets } from '@/app/(tabs)/tweets/page';
import { useEffect, useRef, useState } from 'react';
import ListTweet from './list-tweet';
import Pagination from './pagination';
import { getMoreTweets } from '@/app/(tabs)/tweets/actions';
import { TWEET_PAGE_SIZE } from '@/lib/consts';
import { getTweetsTotalCount } from '@/util/async';

interface ITweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: ITweetListProps) {
  const [Tweets, setTweets] = useState<InitialTweets | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setTweets(initialTweets);
  }, [initialTweets]);

  useEffect(() => {
    const getCount = async () => {
      const count = await getTweetsTotalCount();
      setTotalCount(count);
    };

    getCount();
  }, []);

  const fetchMoreTweets = async (page: number) => {
    const newTweets = await getMoreTweets(page);
    setTweets(newTweets);
  };

  const onPageChange = (page: number) => {
    fetchMoreTweets(page);
    setPage(page);
  };

  return (
    <div className="flex flex-col">
      {Tweets?.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} replyCount={tweet.Response.length} />
      ))}
      <Pagination
        totalCount={totalCount}
        pageSize={TWEET_PAGE_SIZE}
        onPageChange={(page) => onPageChange(page)}
      />
    </div>
  );
}
