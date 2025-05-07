"use server";

import { redirect } from "next/navigation";
import getSession from "../lib/session";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma";
import { unstable_cache as NextCache } from "next/cache";

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

export async function getUserInfo() {
	const session = await getSession();
	const user = await db.user.findUnique({
		where: {
			id: session.id,
		},
		select: {
			id: true,
			username: true,
			avatar: true,
			userId: true,
			email: true,
		},
	});
	return user;
}
// export const getUserInfo = NextCache(fetchUserInfo, ["user-info"], { tags: ["userInfo"] });
export type UserInfoType = Prisma.PromiseReturnType<typeof getUserInfo>;
