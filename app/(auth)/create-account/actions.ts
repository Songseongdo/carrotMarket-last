"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../../lib/consts";
import { FormActionResult } from "../../../util";
import db from "../../../lib/db";
import { doLogin } from "../../../util/async";

const checkPasswords = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
	password === confirm_password;

const formSchema = z
	.object({
		username: z.string().min(2, "2글자 이상 입력해 주세요."),
		id: z.string(),
		password: z.string().regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
		confirm_password: z.string(),
		email: z.string().optional(),
		bio: z.string().trim().optional(),
	})
	.superRefine(async ({ id }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				userId: id,
			},
			select: {
				id: true,
			},
		});
		if (user) {
			ctx.addIssue({
				code: "custom",
				message: "사용할 수 없는 아이디입니다.",
				path: ["id"],
				fatal: true,
			});

			return z.NEVER;
		}
	})
	.superRefine(async ({ username }, ctx) => {
		const user = await db.user.findUnique({
			where: {
				username: username,
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
	})
	.refine(checkPasswords, { message: "비밀번호를 확인해 주세요", path: ["confirm_password"] });

export async function handleForm(_: any, formData: FormData): Promise<FormActionResult> {
	const data = {
		username: formData.get("username"),
		id: formData.get("id"),
		password: formData.get("password"),
		confirm_password: formData.get("confirm_password"),
		email: formData.get("email"),
		bio: formData.get("bio"),
	};
	const result = await formSchema.spa(data);

	if (!result.success) {
		return {
			success: false,
			fieldErrors: result.error.flatten().fieldErrors,
		};
	} else {
		const hashedPW = await bcrypt.hash(result.data.password, 12);

		const user = await db.user.create({
			data: {
				userId: result.data.id,
				username: result.data.username,
				password: hashedPW,
				email: result.data.email || "",
				bio: result.data.bio || "",
			},
			select: {
				id: true,
				avatar: true,
				username: true,
			},
		});

		return doLogin({ id: user.id });
	}
}
