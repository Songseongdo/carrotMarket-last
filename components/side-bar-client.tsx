"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon as SolidHomeIcon, UsersIcon as SolidUsersIcon } from "@heroicons/react/24/solid";
import {
	HomeIcon as OutlineHomeIcon,
	MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
	UsersIcon as OutlineUsersIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { UserInfoType } from "@/util/async";

interface ISideBarClientProps {
	user: UserInfoType;
}
export default function SideBarClient({ user }: ISideBarClientProps) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col justify-between py-10 h-screen">
			<div className="flex gap-10 flex-col h-screen">
				<Link href="/home" className="sidebar_link">
					{pathname === "/home" ? (
						<SolidHomeIcon className="sidebar_icon" />
					) : (
						<OutlineHomeIcon className="sidebar_icon" />
					)}
					<div className="sidebar_text">Home</div>
				</Link>
				<Link href="/search" className="sidebar_link">
					{pathname.includes("/search") ? (
						<svg className="size-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
							/>
						</svg>
					) : (
						<OutlineMagnifyingGlassIcon className="sidebar_icon" />
					)}
					<div className="sidebar_text">Search</div>
				</Link>
				{user && (
					<Link href={`/users/${user.username}`} className="sidebar_link">
						{decodeURIComponent(pathname).includes(`/users/${user.username}`) ? (
							<>
								<SolidUsersIcon className="sidebar_icon" />
								<div className="sidebar_text font-bold">Profile</div>
							</>
						) : (
							<>
								<OutlineUsersIcon className="sidebar_icon" />
								<div className="sidebar_text">Profile</div>
							</>
						)}
					</Link>
				)}
			</div>
			<div>
				<Link href={`/users/${user?.username}/edit`} className="sidebar_link">
					<UserCircleIcon className="sidebar_icon" />
					<div className="flex flex-col">
						<div className="sidebar_text">{user?.username}</div>
						<div className="text-sm text-gray-400 hidden lg:block">@{user?.userId}</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
