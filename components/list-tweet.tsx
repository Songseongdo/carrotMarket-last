"use client";

import { formatToTimeAgo } from "@/util";
import Link from "next/link";
import { PhotoIcon, UserIcon, HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useOptimistic, useState } from "react";
import { getTweetUserInfo, getLoginUserInfo } from "@/util/async";
import { setLike, setUnlike } from "@/app/(tabs)/tweets/actions";

interface ILike {
	id: number;
	userId: number;
}
interface IListTweetProps {
	id: number;
	tweet: string;
	create_at: Date;
	userId: number | null;
	Like: ILike[];
	photo: string | null;
	replyCount: number;
}

interface IUserInfo {
	username: string;
}

export default function ListTweet({
	id,
	tweet,
	create_at,
	userId,
	Like,
	photo,

	replyCount,
}: IListTweetProps) {
	const [tweetUser, setTweetUser] = useState<IUserInfo | null>(null);
	const [userInfo, setUserInfo] = useState<number | null>(null);
	const [isLike, setIsLike] = useState(false);
	const [likeId, setLikeId] = useState(0);

	const [optimisticLikes, addOptimisticLike] = useOptimistic(Like.length, (state, liked: boolean) =>
		liked ? state + 1 : state - 1
	);

	useEffect(() => {
		const fetchData = async () => {
			const tweetUserInfo = await getTweetUserInfo(userId || 0);
			if (tweetUserInfo) {
				setTweetUser(tweetUserInfo);
			}

			const userInfo = await getLoginUserInfo();
			setUserInfo(userInfo?.id!);
			for (let i = 0; i < Like.length; i++) {
				if (Like[i].userId === userInfo?.id) {
					setIsLike(true);
					setLikeId(Like[i].id);
					break;
				}
			}
		};
		fetchData();
	}, [userId, Like]);

	const clickLike = async () => {
		if (isLike) {
			addOptimisticLike(false);
			const rs = await setUnlike(likeId);
			if (rs) {
				setIsLike(false);
			}
		} else {
			addOptimisticLike(true);
			if (userInfo) {
				const rs = await setLike(userInfo!, id);
				if (rs) {
					setIsLike(true);
				}
			}
		}
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
							<div
								className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-secondary"
								data-tip="Like"
								onClick={clickLike}
							>
								{isLike ? <SolidHeartIcon className="size-5" /> : <HeartIcon className="size-5" />}

								<div className="">{optimisticLikes}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
