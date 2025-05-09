"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface IMovePrevProps {
	$text?: string;
	$size?: number;
}
export default function MovePrev({ $text, $size = 0 }: IMovePrevProps) {
	const route = useRouter();
	const onClick = () => {
		route.back();
	};
	const textSize = $size === 1 ? "text-2xl" : "text-md";
	console.log($size);

	return (
		<div className="p-3 hover:cursor-pointer flex gap-5 items-center" onClick={onClick}>
			<ArrowLeftIcon className="size-5" />
			<div className={textSize}>{$text || "이전 화면으로 돌아가기"}</div>
		</div>
	);
}
