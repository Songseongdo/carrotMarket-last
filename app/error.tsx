"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Error() {
	const route = useRouter();
	const onClick = () => {
		route.back();
	};
	return (
		<div className="pt-12">
			<div className="text-red-700 text-2xl">에러가 발생 하였습니다.</div>

			<div className="mt-13 hover:cursor-pointer" onClick={onClick}>
				&larr; 이전 화면으로 돌아가기
			</div>
		</div>
	);
}
