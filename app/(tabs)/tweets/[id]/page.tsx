import { getCachedtweetInfo, TweetType } from "./actions";
import { notFound } from "next/navigation";
import ReplyList from "@/components/reply-list";
import TweetClientView from "@/components/tweet-client-view";
import MovePrev from "@/components/move-prev";

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
			<MovePrev $size={1} $text="Post" />

			<TweetClientView tweetInfo={tweetInfo} />

			<div>
				{tweetInfo.Response.map((reply: any) => (
					<ReplyList key={reply.id} id={reply.id} />
				))}
			</div>
		</div>
	);
}
