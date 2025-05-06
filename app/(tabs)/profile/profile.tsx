"use client";

import Link from "next/link";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { handleForm, logout } from "./actions";
import { FormActionResult } from "../../../util";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import PasswordModify from "./components/password-modify";
import { useRecoilState } from "recoil";
import { popupVisible } from "../../../state";

interface IProfile {
	userId: string;
	username: string;
	password: string;
	email: string | null;
	bio: string | null;
	avatar: number | null;
	create_at: Date;
	updated_at: Date;
}
export default function Profile({ user }: { user: IProfile | null }) {
	const [state, dispatch] = useFormState<FormActionResult, FormData>(handleForm, null);
	const [visiblePopup, setVisiblePopup] = useRecoilState(popupVisible);

	useEffect(() => {
		if (state?.success) {
			alert("수정 사항이 저장되었습니다.");
		}
	}, [state]);

	const modifyPW = () => {
		setVisiblePopup(true);
	};

	return (
		<div className="flex flex-col gap-10 py-8 px-6">
			{visiblePopup ? (
				<PasswordModify />
			) : (
				<>
					<Link href="/">&larr; 홈으로</Link>
					<div className="flex flex-col gap-2 *:font-medium mt-10">
						<div className="flex items-center">
							<h1 className="text-2xl">내 프로필</h1>
							<form action={logout} className="w-1/5 h-1/2 ml-10 ">
								<Button $text="Log Out"></Button>
							</form>
						</div>
						<h2 className="text-xl">{user?.username}님 안녕하세요!</h2>
					</div>

					<form action={dispatch}>
						<div className="flex flex-col gap-3">
							<div className="profile_container">
								<div className="profile_label">아이디</div>
								<div className="profile_value">{user?.userId}</div>
							</div>
							<div className="profile_container">
								<div className="profile_label">유저 이름</div>
								<div className="profile_value">
									<Input $name="username" defaultValue={user?.username || ""} />
								</div>
							</div>
							<div className="profile_container">
								<div className="profile_label">비밀번호</div>
								<div className="profile_value " onClick={modifyPW}>
									<span className="hover:border-b-amber-100 hover:border-b-1 hover:cursor-pointer">
										수정
									</span>
								</div>
							</div>
							<div className="profile_container">
								<div className="profile_label">이메일</div>
								<div className="profile_value">
									<Input $name="email" defaultValue={user?.email || ""} />
								</div>
							</div>

							<div className="w-full h-8 mt-5 flex justify-end">
								<div className="w-20">
									<Button $text="수정" $btn_type="blue" />
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</div>
	);
}
