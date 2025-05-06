"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

interface IFormButtonProps {
	$text: string;
	$callFn?: () => void;
}

const _Button = forwardRef<HTMLButtonElement, IFormButtonProps>(({ $text, $callFn }, ref) => {
	const { pending } = useFormStatus();
	return (
		<button
			ref={ref}
			onClick={$callFn ?? undefined}
			disabled={pending}
			className="w-full h-10 rounded-full disabled:bg-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed bg-neutral-400 hover:bg-neutral-500"
		>
			{pending ? "로딩 중" : $text}
		</button>
	);
});

export default _Button;
