"use client";

import { useOptimistic } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { setLike, setUnlike } from "@/app/(tabs)/tweets/actions";

interface ILikeOptimisticProps {
	isLiked: boolean;
	likeCount: number;
	postId: number;
	onChange: (newLike: boolean, likeCount: number) => void;
}
export default function LikeOptimistic({ isLiked, likeCount, postId, onChange }: ILikeOptimisticProps) {
	const [optimisticState, updateOptimisticState] = useOptimistic(
		{
			isLiked,
			likeCount,
		},
		(previousState, _) => ({
			isLiked: !previousState.isLiked,
			likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
		})
	);

	const onClick = async () => {
		updateOptimisticState(undefined);

		const result = isLiked ? await setUnlike(postId) : await setLike(postId);
		if (result) {
			onChange?.(!isLiked, isLiked ? likeCount - 1 : likeCount + 1);
		}
	};

	return (
		<div
			className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-secondary"
			data-tip="Like"
			onClick={onClick}
		>
			{optimisticState.isLiked ? <SolidHeartIcon className="size-5" /> : <HeartIcon className="size-5" />}

			<div className="">{optimisticState.likeCount}</div>
		</div>
	);
}
