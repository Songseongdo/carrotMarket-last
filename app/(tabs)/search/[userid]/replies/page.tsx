import React from "react";
import { unstable_cache as NextCache } from "next/cache";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import TweetList from "@/components/tweet-list";

async function getSearchReplies(userId: string) {
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
const getCachedReplies = NextCache((userId: string) => getSearchReplies(userId), ["serch-replies"], {
	tags: ["serch-info"],
	revalidate: 60,
});
export type InitialTweets = Prisma.PromiseReturnType<typeof getCachedReplies>;

export default async function SearchReplies({ params }: { params: { userid: string } }) {
	const cleanUserId = decodeURIComponent(params.userid).split("/").pop();
	const init = await getCachedReplies(cleanUserId!);

	console.log(init);

	return (
		<div className="p-5">
			<TweetList initialTweets={init} />
		</div>
	);
}
