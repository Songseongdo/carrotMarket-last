"use client";

import { useFormState } from "react-dom";
import { FormActionResult, getError } from "@/util";
import Input from "@/components/input";
import Button from "@/components/button";
import { handleForm } from "./actions";
import { useSetRecoilState } from "recoil";
import { popupVisible } from "@/state";
import { useEffect } from "react";

export default function PasswordModify() {
	const [state, dispatch] = useFormState<FormActionResult, FormData>(handleForm, null);
	const setPopupVisible = useSetRecoilState(popupVisible);

	const clickCancel = () => {
		setPopupVisible(false);
	};

	useEffect(() => {
		if (state?.success) {
			alert("비밀번호가 변경되었습니다.");

			clickCancel();
		}
	}, [state]);

	return (
		<div className="w-screen h-screen bg-neutral-800  absolute top-0 left-0 z-10 flex">
			<div className="mx-auto mt-30">
				<div className="flex flex-col gap-10 py-8 px-6">
					<div className="flex flex-col gap-2 *:font-medium mt-10">
						<h1 className="text-2xl">비밀번호 변경</h1>
					</div>
				</div>
				<form action={dispatch} className="flex flex-col gap-3 w-100">
					<Input
						$name="prev_password"
						placeholder="이전비밀번호"
						type="password"
						$errors={getError(state, "prev_password")}
					/>
					<Input
						$name="password"
						placeholder="비밀번호"
						type="password"
						$errors={getError(state, "password")}
					/>
					<Input
						$name="confirm_password"
						placeholder="비밀번호 확인"
						type="password"
						$errors={getError(state, "confirm_password")}
					/>

					<div className="w-full flex justify-end">
						<div className="h-10 w-20 mr-5 flex justify-center items-center" onClick={clickCancel}>
							<span className="hover:border-b-amber-100 hover:border-b-1 hover:cursor-pointer">취소</span>
						</div>
						<div className="h-10 w-20">
							<Button $text="수정" $btn_type="blue" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
