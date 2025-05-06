"use server";

import { z } from "zod";

const checkPassword = (password: string) => password === "12345";
const emailRegex = new RegExp(/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim);

const formSchema = z.object({
	email: z.string().regex(emailRegex, "이메일 형식을 확인해 주세요."),
	username: z.string().min(2, "사용자 이름을 최소 2자 이상 입력해 주세요."),
	password: z.string().refine(checkPassword, "비밀번호를 확인해 주세요."),
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
		console.log(result);

		return {
			success: false,
			error: result.error.flatten().fieldErrors,
		};
	}
	return { success: true };
}
