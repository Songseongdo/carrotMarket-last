"use server";

import { z } from "zod";
import { PASSWORD_MIN_LENGTH } from "../lib/consts";

const correctPassword = (password: string) => password === "abcde12345";
const emailRegex = new RegExp(/([\w\.\-_]+)?\w+@zod.com/gim);
const checkPassword = new RegExp(/(?=.*\d)/);

const formSchema = z.object({
	email: z.string().toLowerCase().regex(emailRegex, "zod.com 도메인만 가능합니다."),
	username: z.string().min(5, "사용자 이름을 최소 5자 이상 입력해 주세요."),
	password: z
		.string()
		.min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 10자 이상을 입력해주세요.")
		.regex(checkPassword, "비밀번호는 숫자를 포함해야 합니다.")
		.refine(correctPassword, "비밀번호가 일치하지 않습니다."),
});

export async function createAccount(prevState: any, formData: FormData) {
	const data = {
		email: formData.get("email"),
		username: formData.get("username"),
		password: formData.get("password"),
	};

	await new Promise((resolve) => setTimeout(resolve, 1000));

	const result = formSchema.safeParse(data);

	if (!result.success) {
		return {
			success: false,
			error: result.error.flatten().fieldErrors,
		};
	}
	return { success: true };
}
