"use client";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Link from "next/link";
import Input from "@/components/input";
import Button from "@/components/button";
import { FormActionResult, getError } from "@/util";
import React from "react";

export default function Login() {
	const [state, dispatch] = useFormState<FormActionResult, FormData>(handleForm, null);

	return (
		<div className="flex flex-col gap-10 py-8 px-6 mt-10">
			<Link href="/">&larr; 이전 화면으로</Link>
			<div className="flex flex-col gap-2 *:font-medium">
				<h1 className="text-2xl">안녕하세요!</h1>
				<h2 className="text-xl">아이디와 비밀번호를 입력하세요.</h2>
			</div>
			<form action={dispatch} className="flex flex-col gap-3">
				<Input $name="id" placeholder="아이디" type="text" $errors={getError(state, "id")} />
				<Input $name="password" placeholder="비밀번호" type="password" $errors={getError(state, "password")} />

				<div className="mt-10 h-10">
					<Button $text="로그인" />
				</div>
			</form>

			<Link
				href="/create-account"
				className="w-full h-10 flex items-center justify-center rounded-full disabled:bg-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600"
			>
				회원 가입
			</Link>
		</div>
	);
}
