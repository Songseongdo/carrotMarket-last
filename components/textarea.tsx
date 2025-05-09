import React from "react";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { IdentificationIcon } from "@heroicons/react/24/outline";

interface IFromTextareaProps {
	$name: string;
	$errors?: string[];
}

const _Textarea = forwardRef<HTMLTextAreaElement, IFromTextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>>(
	({ $name, $errors = [], ...rest }, ref) => {
		return (
			<div className="flex flex-col gap-2 relative">
				<textarea
					ref={ref}
					className="p-5 pl-10 pb-6 bg-transparent rounded-3xl resize-none w-full h-40 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
					name={$name}
					key={$name}
					{...rest}
				/>

				<IdentificationIcon className="absolute size-6 left-2 top-16 text-neutral-400" />

				{$errors?.map((error, index) => (
					<span key={index} className="text-red-500 font-medium pl-2">
						{error}
					</span>
				))}
			</div>
		);
	}
);

export default _Textarea;
