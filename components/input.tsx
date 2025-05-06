import { forwardRef, InputHTMLAttributes } from "react";

interface IFromInputProps {
	$name: string;
	$errors?: string[];
}

const _Input = forwardRef<HTMLInputElement, IFromInputProps & InputHTMLAttributes<HTMLInputElement>>(
	({ $name, $errors = [], ...rest }, ref) => {
		return (
			<div className="flex flex-col gap-2 relative">
				<input
					ref={ref}
					className="p-5 pl-10 pb-6 bg-transparent rounded-full w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
					name={$name}
					{...rest}
				/>

				<svg
					data-slot="icon"
					fill="none"
					strokeWidth={1.5}
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					className="size-4 absolute left-3 top-[15px]  text-neutral-400"
				>
					{$name === "email" ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
						/>
					) : null}
					{$name === "username" ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					) : null}
					{$name === "password" ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
						/>
					) : null}
				</svg>

				{$errors?.map((error, index) => (
					<span key={index} className="text-red-500 font-medium">
						{error}
					</span>
				))}
			</div>
		);
	}
);

export default _Input;
