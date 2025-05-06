'use client';

import { HeartIcon, ChatBubbleOvalLeftIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PhotoIcon, UserIcon } from '@heroicons/react/24/solid';
import { formatToTimeAgo } from '@/util';
import { useEffect, useState } from 'react';
import { getReplyInfo, ReplyType } from '@/app/(tabs)/tweets/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface IReplyListProps {
  id: number;
}
export default function ReplyList({ id }: IReplyListProps) {
  const [reply, setReply] = useState<ReplyType | null>(null);

  useEffect(() => {
    (async () => {
      const reply = await getReplyInfo(id);
      if (reply) {
        setReply(reply);
      } else {
        notFound();
      }
    })();
  }, []);

  return (
    <div className="border mt-[-1px] border-neutral-600 p-2">
      {reply ? (
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <UserIcon className="w-8" />
            <div className="flex flex-col justify-center">
              <div className="flex gap-2 items-center">
                <div>{reply?.user.username || '알 수 없는 사용자'}</div>

                <div className="text-neutral-500">
                  <span className="mr-3">|</span>
                  {formatToTimeAgo(reply?.create_at)}
                </div>
              </div>
              <div>{reply?.comment}</div>
            </div>
          </div>
          <div className="w-full pl-8">
            <div className="w-full">
              <Link href={`/tweets/${id}`}>
                {reply?.photo ? <img src={reply?.photo} className="rounded-3xl" /> : null}
              </Link>

              {/* <div className="flex items-center justify-between px-5 text-2xl mt-3 text-neutral-400">
              <div
                className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-primary"
                data-tip="Reply"
              >
                <ChatBubbleOvalLeftIcon className="size-6" />
                <div className=" ">{reply.Response.length}</div>
              </div>
              <div
                className="flex items-center gap-1 hover:cursor-pointer tooltip tooltip-secondary"
                data-tip="Like"
              >
                <HeartIcon className="size-6 mt-[2px]" />
                <div className=" ">{reply?.Like.length}</div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
