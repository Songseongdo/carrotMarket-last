import TweetList from "@/components/tweet-list";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { unstable_cache as NextCache } from "next/cache";
import React from "react";

async function getTweetInfo() {
	const tweets = await db.tweet.findMany({
		orderBy: {
			create_at: "desc",
		},
		include: {
			Like: {
				select: {
					tweetId: true,
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
		take: TWEET_PAGE_SIZE,
	});
	return tweets;
}
const getCachedtweetInfo = NextCache(getTweetInfo, ["tweets-list"], {
	tags: ["tweets"],
});

export type InitialTweets = Prisma.PromiseReturnType<typeof getCachedtweetInfo>;

export default async function Tweets() {
	const initialTweets = await getCachedtweetInfo();

	return (
		<div className="w-full">
			<TweetList initialTweets={initialTweets} />
		</div>
	);
}
