import React from "react";
import { unstable_cache as NextCache } from "next/cache";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import TweetList from "@/components/tweet-list";

async function getSearchLikes(userId: string) {
	const tweets = db.tweet.findMany({
		where: {
			user: { userId: userId },
		},
		orderBy: {
			create_at: "desc",
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
		take: TWEET_PAGE_SIZE,
	});
	return tweets;
}
const getCachedLikes = NextCache((userId: string) => getSearchLikes(userId), ["serch-likes"], {
	tags: ["serch-info"],
	revalidate: 60,
});
export type InitialTweets = Prisma.PromiseReturnType<typeof getCachedLikes>;

export default async function SearchLikes({ params }: { params: { userid: string } }) {
	const cleanUserId = decodeURIComponent(params.userid).split("/").pop();
	const init = await getCachedLikes(decodeURIComponent(cleanUserId!));

	return (
		<div className="p-5">
			<TweetList initialTweets={init} />
		</div>
	);
}
