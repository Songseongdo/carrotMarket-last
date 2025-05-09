"use client";

import { useState } from "react";
import { ArrowLeftIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import SearchList from "./(components)/search-list";
import { UsersType } from "./actions";
import React from "react";

export default function Search() {
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState("");
	const [users, setUsers] = useState<UsersType>([]);

	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;

		setValue(value);

		const userRes = await fetch("/api/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: value }),
		});
		const users = await userRes.json();

		setUsers(users);
	};
	const initValue = () => {
		setValue("");
		setUsers([]);
	};
	const onClick = () => {
		initValue();
	};
	const onBlur = () => {
		setTimeout(() => {
			setFocused(false);
			initValue();
		}, 100);
	};
	const onClickXCircle = () => {
		initValue();
	};

	return (
		<div>
			<div className="flex items-center w-full gap-5 relative">
				{focused && <ArrowLeftIcon className="size-5 hover:cursor-pointer" onClick={onClick} />}
				<div className="w-full relative">
					<MagnifyingGlassIcon className="size-4 absolute left-3 top-[14px]" />
					<input
						name="search"
						placeholder="Search"
						className="p-5 pl-10 pr-10 pb-6 bg-transparent rounded-full w-full h-10 focus:outline-none ring-2 focus:ring-2 ring-neutral-500 focus:ring-blue-500 border-none placeholder:text-neutral-400 z-10"
						value={value}
						onChange={onChange}
						onFocus={() => setFocused(true)}
						onBlur={onBlur}
					/>
					{value !== "" && (
						<XCircleIcon
							className="size-5 absolute right-3 top-[12px] hover:cursor-pointer"
							onClick={onClickXCircle}
						/>
					)}

					{focused && (
						<div className="absolute top-full mt-1 w-full h-100 bg-gray-800 rounded-2xl z-1 shadow-lg">
							<SearchList users={users} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
