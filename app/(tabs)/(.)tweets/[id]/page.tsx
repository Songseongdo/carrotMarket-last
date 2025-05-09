"use client";

import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import ReplyList from "@/components/reply-list";
import TweetClientView from "@/components/tweet-client-view";

export const dynamic = "auto"; // 기본

export default function TweetsDetailModal({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}

	const [tweetInfo, setTweetInfo] = useState<any>(null);

	useEffect(() => {
		(async () => {
			const rs = await fetch("/api/tweets/id", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: params.id }),
			});
			const data = await rs.json();

			setTweetInfo(data);
		})();
	}, []);

	const router = useRouter();

	const onClose = () => router.back();

	return (
		<div
			className="bg-black opacity-80 w-screen absolute left-0 top-0 h-screen flex pt-[100px] px-10 justify-center"
			onClick={onClose}
		>
			{tweetInfo && (
				<div className="max-w-[500px] opacity-100 " onClick={(e) => e.stopPropagation()}>
					<TweetClientView tweetInfo={tweetInfo} />

					<div>
						{tweetInfo.Response.map((reply: any) => (
							<ReplyList key={reply.id} id={reply.id} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
