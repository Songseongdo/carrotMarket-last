"use server";

import { z } from "zod";
import { FormActionResult } from "@/util";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const formSchema = z
	.object({
		username: z.string().min(2, "이름을 입력해 주세요."),
		email: z.string(),
		bio: z.string().trim().optional(),
	})
	.superRefine(async ({ username }, ctx) => {
		const session = await getSession();
		const user = await db.user.findUnique({
			where: {
				username: username,
				NOT: {
					id: session.id,
				},
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "이미 사용중인 이름입니다.",
				path: ["username"],
				fatal: true,
			});

			return z.NEVER;
		}
	});
export async function handleForm(_: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		username: formData.get("username"),
		email: formData.get("email"),
		bio: formData.get("bio"),
	};

	const result = await formSchema.spa(data);
	if (result.success) {
		const sesstion = await getSession();
		const user = await db.user.update({
			where: {
				id: sesstion.id,
			},
			data: {
				username: result.data.username,
				email: result.data.email || "",
				bio: result.data.bio || "",
			},
		});
		if (user) {
			revalidateTag("userInfo");

			return {
				success: true,
			};
		} else {
			return {
				success: false,
				fieldErrors: {
					email: ["업데이트에 실패하였습니다."],
				},
			};
		}
	} else {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors,
		};
	}
}

export async function getUser() {
	const session = await getSession();
	if (session.id) {
		return await db.user.findUnique({
			where: {
				id: session.id,
			},
		});
	} else {
		redirect("/");
	}
}

export const logout = async () => {
	const session = await getSession();
	await session.destroy();

	redirect("/");
};
