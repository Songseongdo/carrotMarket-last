"use client";

import Link from "next/link";
import { UsersType } from "../actions";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ISearchBarProps {
	users: UsersType;
}
export default function SearchList({ users }: ISearchBarProps) {
	return (
		<div className="p-5 flex flex-col gap-3">
			{users.map((user: any) => (
				<Link key={user.userId} href={`/search/${user.userId}`} className="flex items-center gap-3">
					<div>
						<UserIcon className="size-6" />
					</div>
					<div className="flex flex-col">
						<div className="font-bold">{user.username}</div>
						<div className="text-gray-500 text-sm">@{user.userId}</div>
					</div>
				</Link>
			))}
		</div>
	);
}
