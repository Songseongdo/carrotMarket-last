import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getCachedtweetInfo, TweetType } from "./actions";
import { notFound } from "next/navigation";
import ReplyList from "@/components/reply-list";
import TweetClientView from "@/components/tweet-client-view";

export const dynamic = "auto"; // 기본

export default async function TweetsDetail({ params }: { params: { id: string } }) {
	const id = Number(params.id);
	if (isNaN(id)) {
		return notFound();
	}

	const tweetInfo: TweetType = await getCachedtweetInfo(id);
	if (!tweetInfo) return notFound();

	return (
		<div>
			<div className="my-5 text-2xl">
				<Link href="/" className="flex items-center">
					<div className="size-5">
						<ArrowLeftIcon />
					</div>
					&nbsp;&nbsp;&nbsp;Post
				</Link>
			</div>

			<TweetClientView tweetInfo={tweetInfo} />

			<div>
				{tweetInfo.Response.map((reply: any) => (
					<ReplyList key={reply.id} id={reply.id} />
				))}
			</div>
		</div>
	);
}
