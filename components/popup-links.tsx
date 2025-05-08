"use client";

import React from "react";

export default function PopupLinks() {
	const onClick = () => {
		alert("서비스 준비 중입니다.");
	};

	return (
		<div className="flex justify-between w-[250px] text-xs">
			<div className="hover:border-b-1" onClick={onClick}>
				아이디 찾기
			</div>
			{/* <Link href="/" className="hover:border-b-1">
							아이디 찾기
						</Link> */}
			<div>|</div>
			{/* <Link href="/" className="hover:border-b-1">
							비밀번호 찾기
						</Link> */}
			<div className="hover:border-b-1" onClick={onClick}>
				비밀번호 찾기
			</div>
			<div>|</div>
			<a href="/create-account" className="hover:border-b-1">
				회원가입
			</a>
		</div>
	);
}
