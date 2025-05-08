"use server";

import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";

interface IDologinProps {
	id: number;
}
export async function doLogin({ id }: IDologinProps) {
	const session = await getSession();
	session.id = id;
	await session.save();

	return redirect("/home");
}

export async function getTweetUserInfo(userId: number) {
	const user = db.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			username: true,
		},
	});
	return user;
}

export async function getTweetsTotalCount() {
	const count = await db.tweet.count();
	return count;
}

// 이미지 업로드
export async function uploadToSignedUrl(signedUrl: string, file: File) {
	try {
		const res = await fetch(signedUrl, {
			method: "PUT",
			headers: {
				"Content-Type": file.type,
			},
			body: file,
		});

		return res.ok;
	} catch (err) {
		console.error("업로드 에러", err);
		return false;
	}
}

export async function getLoginUserInfo() {
	const session = await getSession();
	if (session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
		return user;
	} else {
		return null;
	}
}

export async function getUserInfo(id: number) {
	if (!id) return null;

	const user = await db.user.findUnique({
		where: {
			id: id,
		},
	});
	return user;
}
export type UserInfoType = Prisma.PromiseReturnType<typeof getUserInfo>;

export async function getPost(id: number) {
	const tweet = await db.tweet.findMany({
		where: {
			userId: id,
		},
	});

	return tweet;
}
export type TweetsType = Prisma.PromiseReturnType<typeof getPost>;

export async function getLikes(id: number) {
	const like = await db.like.findMany({
		where: {
			userId: id,
		},
	});
	return like;
}
export type LikesType = Prisma.PromiseReturnType<typeof getLikes>;

export async function getIdFromUserId(userId: string) {
	const user = await db.user.findUnique({
		where: {
			userId: userId,
		},
		select: {
			id: true,
		},
	});
	if (user) {
		return user.id;
	} else {
		return null;
	}
}
