import React from "react";
import { unstable_cache as NextCache } from "next/cache";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import TweetList from "@/components/tweet-list";

async function getSearchPosts(userId: string) {
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
const getCachedPosts = NextCache((userId: string) => getSearchPosts(userId), ["serch-posts"], {
	tags: ["serch-info"],
	revalidate: 60,
});
export type InitialTweets = Prisma.PromiseReturnType<typeof getCachedPosts>;

export default async function SearchPosts({ params }: { params: { userid: string } }) {
	const cleanUserId = decodeURIComponent(params.userid).split("/").pop();
	const init = await getCachedPosts(cleanUserId!);

	return (
		<div className="p-5">
			<TweetList initialTweets={init} />
		</div>
	);
}
