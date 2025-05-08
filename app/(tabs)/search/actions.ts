import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";

export async function getTweets(text: string) {
	const tweet = await db.tweet.findMany({
		where: {
			tweet: {
				contains: text,
				mode: "insensitive",
			},
		},
		select: {
			tweet: true,
		},
	});
	if (tweet) {
		return tweet;
	} else {
		return [];
	}
}
export type TweetsType = Prisma.PromiseReturnType<typeof getTweets>;

export async function getUsers(text: string) {
	const users = await db.user.findMany({
		where: {
			username: {
				contains: text,
				mode: "insensitive",
			},
		},
		select: {
			userId: true,
			username: true,
		},
	});
	if (users) {
		return users;
	} else {
		return [];
	}
}
export type UsersType = Prisma.PromiseReturnType<typeof getUsers>;
