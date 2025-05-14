import { unstable_cache as NextCache } from "next/cache";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { TWEET_PAGE_SIZE } from "@/lib/consts";
import TweetList from "@/components/tweet-list";

async function getUsersLikes(username: string) {
	const tweets = db.tweet.findMany({
		where: {
			Like: {
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
const getCachedLikes = NextCache((username: string) => getUsersLikes(username), ["users-likes"], {
	tags: ["users-info"],
	revalidate: 60,
});
export type InitialTweets = Prisma.PromiseReturnType<typeof getCachedLikes>;

export default async function UserLikes({ params }: { params: { username: string } }) {
	const init = await getCachedLikes(decodeURIComponent(params.username));

	return (
		<div className="p-5">
			<TweetList initialTweets={init} />
		</div>
	);
}
