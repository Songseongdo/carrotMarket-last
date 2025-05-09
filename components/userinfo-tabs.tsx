"use client";

import { usePathname } from "next/navigation";
import { UserInfoType } from "@/util/async";
import Link from "next/link";

interface ITabsProps {
	user: UserInfoType;
	searched: boolean;
}
export default function UserInfoTabs({ user, searched = false }: ITabsProps) {
	const pathname = usePathname();

	if (!user) return;

	const tabs = searched
		? [
				{ label: "Posts", href: `/search/${user.userId}` },
				{ label: "Replies", href: `/search/${user.userId}/replies` },
				{ label: "Likes", href: `/search/${user.userId}/likes` },
			]
		: [
				{ label: "Posts", href: `/users/${user.username}` },
				{ label: "Replies", href: `/users/${user.username}/replies` },
				{ label: "Likes", href: `/users/${user.username}/likes` },
			];

	return (
		<div className="flex items-center gap-5 border-b border-gray-600 text-sm">
			{tabs.map((tab) => {
				const isActive = decodeURIComponent(pathname) === tab.href;
				return (
					<Link
						key={tab.label}
						href={tab.href}
						className={`py-3 px-2 ${
							isActive
								? "border-b-3 border-blue-500 text-white font-semibold"
								: "text-gray-400 hover:text-white"
						}`}
					>
						{tab.label}
					</Link>
				);
			})}
		</div>
	);
}
