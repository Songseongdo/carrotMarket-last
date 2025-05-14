import { unstable_cache as NextCache } from "next/cache";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import TweetList from "@/components/tweet-list";

async function getUsersReplies(username: string) {
	const tweets = db.tweet.findMany({
		where: {
			Response: {
				some: {
					user: {
						username: username,
					},
				},
			},
		},
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
const getCachedReplies = NextCache((username: string) => getUsersReplies(username), ["users-replies"], {
	tags: ["users-info"],
	revalidate: 60,
});
export type InitialTweets = Prisma.PromiseReturnType<typeof getCachedReplies>;

export default async function UserReplies({ params }: { params: { username: string } }) {
	const init = await getCachedReplies(decodeURIComponent(params.username));

	return (
		<div className="p-5">
			<TweetList initialTweets={init} />
		</div>
	);
}
