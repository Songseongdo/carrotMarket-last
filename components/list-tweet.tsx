"use client";

import { formatToTimeAgo } from "@/util";
import Link from "next/link";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { getTweetUserInfo } from "@/util/async";
import React, { useEffect, useState } from "react";
import { getLikeStatus } from "@/app/(tabs)/tweets/actions";
import LikeOptimistic from "./like-optimistic";

interface IListTweetProps {
	id: number;
	tweet: string;
	create_at: Date;
	userId: number | null;
	photo: string | null;
	replyCount: number;
}

export default function ListTweet({ id, tweet, create_at, userId, photo, replyCount }: IListTweetProps) {
	const [tweetUser, setTweetUser] = useState<{ username: string } | null>(null);
	const [isLiked, setIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	useEffect(() => {
		const fetchUser = async () => {
			const data = await getTweetUserInfo(userId || 0);
			setTweetUser(data);

			likeStatus();
		};
		fetchUser();
	}, [userId, id]);

	const likeStatus = async () => {
		const { isLiked, likeCount } = await getLikeStatus(id);
		setIsLiked(isLiked);
		setLikeCount(likeCount);
	};

	return (
		<div className="border mt-[-1px] border-neutral-600 p-2">
			<div className="flex flex-col gap-5">
				<div className="flex gap-3">
					<UserIcon className="w-8" />

					<div className="flex flex-col justify-center">
						<div className="flex gap-2 items-center">
							<div>{tweetUser?.username || "알 수 없는 사용자"}</div>
							<div className="text-neutral-500">
								<span className="mr-3">|</span>
								{formatToTimeAgo(create_at)}
							</div>
						</div>
						<div>{tweet}</div>
					</div>
				</div>
				<div className="w-full pl-8">
					<div className="w-full">
						<Link href={`/tweets/${id}`}>
							{photo ? (
								<img src={photo} className="rounded-3xl" />
							) : (
								<PhotoIcon className="size-full" viewBox="1.4 3.6 21.3 16.7" />
							)}
						</Link>

						<div className="flex items-center justify-between px-5 mt-3 text-neutral-400 text-xl">
							<div
								className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-primary"
								data-tip="Reply"
							>
								<ChatBubbleOvalLeftIcon className="size-5" />
								<div className="">{replyCount}</div>
							</div>
							<LikeOptimistic
								isLiked={isLiked}
								likeCount={likeCount}
								postId={id}
								onChange={(newLike: boolean, likeCount: number) => {
									console.log("onchange", newLike, likeCount);

									setIsLiked(newLike);
									setLikeCount(likeCount);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
