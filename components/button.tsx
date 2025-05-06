"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface IFormButtonProps {
	$text: string;
	$callFn?: () => void;
	$btn_type?: string;
	$disabled?: boolean;
}

const _Button = forwardRef<HTMLButtonElement, IFormButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
	({ $text, $callFn, $btn_type = "default", $disabled = false, ...rest }, ref) => {
		const { pending } = useFormStatus();

		const baseClass =
			"w-full h-full rounded-full disabled:bg-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed";

		const variantClass =
			$btn_type === "default" ? "bg-neutral-400 hover:bg-neutral-500" : "bg-blue-500 hover:bg-blue-600";

		const whiteClass =
			$btn_type === "white" ? "text-black disabled:text-black bg-white hover:bg-neutral-300 font-bold" : "";

		return (
			<button
				ref={ref}
				{...rest}
				onClick={$callFn ?? undefined}
				disabled={pending || $disabled}
				className={`${baseClass} ${variantClass} ${whiteClass}`}
			>
				{pending ? "로딩 중" : $text}
			</button>
		);
	}
);

export default _Button;
