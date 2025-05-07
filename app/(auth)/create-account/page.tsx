"use client";

import Link from "next/link";
import Input from "@/components/input";
import Button from "@/components/button";
import { handleForm } from "./actions";
import { FormActionResult, getError } from "@/util";
import { useFormState } from "react-dom";

export default function CreateAccount() {
	const [state, dispatch] = useFormState<FormActionResult, FormData>(handleForm, null);

	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			<Link href="/login">&larr; 이전 화면으로</Link>
			<div className="flex flex-col gap-2 *:font-medium mt-10">
				<h1 className="text-2xl">안녕하세요!</h1>
				<h2 className="text-xl">사용자 정보를 입력하세요.</h2>
			</div>
			<form action={dispatch} className="flex flex-col gap-3">
				<Input $name="id" placeholder="아이디" type="text" $errors={getError(state, "id")} />
				<Input $name="username" placeholder="이름" type="text" $errors={getError(state, "username")} />
				<Input $name="password" placeholder="비밀번호" type="password" $errors={getError(state, "password")} />
				<Input
					$name="confirm_password"
					placeholder="비밀번호 확인"
					type="password"
					$errors={getError(state, "confirm_password")}
				/>
				<Input $name="email" placeholder="이메일" type="email" $errors={getError(state, "email")} />

				<div className="mt-10 h-10">
					<Button $text="가입" />
				</div>
			</form>
		</div>
	);
}
