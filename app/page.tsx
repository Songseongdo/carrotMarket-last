"use client";

import Input from "../components/input";
import Button from "../components/button";
import { createAccount } from "./actions";
import { useFormState } from "react-dom";

import SuccessMsg from "../components/success-msg";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { popupVisible } from "../state";

export default function RootPage() {
	const [state, action] = useFormState(createAccount, null);
	const [popup, setPopup] = useRecoilState(popupVisible);

	type FieldName = "email" | "username" | "password";
	const getError = (name: FieldName) => {
		if (state && !state.success && "error" in state) {
			return state.error?.[name] ?? [];
		}
		return [];
	};

	useEffect(() => {
		if (state && state?.success) {
			setPopup(true);
		}
	}, [state]);

	return (
		<div className="flex flex-col items-center min-h-screen pt-[200px]">
			<div className="text-[60px] mb-10">🔥</div>

			<form action={action} className="flex flex-col gap-5 w-xs">
				<Input $name="email" $errors={getError("email")} type="email" placeholder="Email" />
				<Input $name="username" $errors={getError("username")} type="text" placeholder="Username" />
				<Input $name="password" $errors={getError("password")} type="password" placeholder="Password" />
				<Button $text="Log in" />
			</form>

			{popup ? <SuccessMsg /> : null}
		</div>
	);
}
