"use client";

import { InitialTweets } from "@/app/(tabs)/tweets/page";
import { useEffect, useState } from "react";
import ListTweet from "./list-tweet";
import Pagination from "./pagination";
import { getMoreTweets } from "@/app/(tabs)/tweets/actions";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import React from "react";

interface ITweetListProps {
	initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: ITweetListProps) {
	const [Tweets, setTweets] = useState<InitialTweets | null>(null);
	const [_, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		setTweets(initialTweets);
		setTotalCount(initialTweets.length);
	}, [initialTweets]);

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
			{Tweets?.map((tweet: any) => <ListTweet key={tweet.id} {...tweet} replyCount={tweet.Response.length} />)}
			{totalCount === 0 ? null : (
				<Pagination
					totalCount={totalCount}
					pageSize={TWEET_PAGE_SIZE}
					onPageChange={(page) => onPageChange(page)}
				/>
			)}
		</div>
	);
}
