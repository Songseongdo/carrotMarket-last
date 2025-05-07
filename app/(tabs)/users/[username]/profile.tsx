"use client";

import { LikesType, TweetsType, UserInfoType } from "./actions";
import { CalendarDaysIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProfileProps {
	user: UserInfoType;
	tweets: TweetsType;
	likes: LikesType;
}
export default function Profile({ user, tweets, likes }: IProfileProps) {
	const router = useRouter();

	return (
		<div className="py-8 px-6 w-full">
			<div
				className="border-b border-gray-600 pb-2 mb-10 hover:cursor-pointer flex items-center gap-4"
				onClick={() => router.back()}
			>
				<ArrowLeftIcon className="size-5" />
				<div className="flex flex-col">
					<div className="font-bold">{user?.username}</div>
					<div className="text-gray-500 text-sm">{tweets.length} posts</div>
				</div>
			</div>
			<div className="flex flex-col mb-10 relative">
				<Link
					className="absolute rounded-full border border-gray-400 px-3 py-1 right-5 text-sm font-bold"
					href={`/users/${user?.username}/edit`}
				>
					Edit profile
				</Link>

				<div className="font-extrabold text-lg">{user?.username}</div>
				<div className="text-gray-500 text-sm">@{user?.userId}</div>
				{user?.bio ? <div className=" mt-5">{user?.bio}</div> : null}
				<div className="text-gray-500 flex items-center gap-2 mt-5">
					<CalendarDaysIcon className="h-6 w-6 " />
					<div>Joined {user?.create_at.toLocaleDateString("en-US", { year: "numeric", month: "long" })}</div>
				</div>
			</div>
		</div>
	);
}
