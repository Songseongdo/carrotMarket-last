"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhotoIcon, GifIcon, UserIcon } from "@heroicons/react/24/outline";
import { getSignedUploadUrl, uploadReply } from "@/app/(tabs)/tweets/actions";
import Input from "./input";
import Button from "./button";
import { replySchema, ReplyType } from "@/app/(tabs)/tweets/schema";
import { getUserInfo, uploadToSignedUrl, UserInfoType } from "@/util/async";

interface IReplyProps {
	tweetId: number;
	callSumit: () => void;
}
export default function Reply({ tweetId, callSumit }: IReplyProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [input, setInput] = useState("");
	const [preview, setPreview] = useState("");
	const [signedUploadUrl, setSignedUploadUrl] = useState<string | null>(null);
	const [uuid, setUuid] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReplyType>({
		resolver: zodResolver(replySchema),
	});
	const [userInfo, setUserInfo] = useState<null | UserInfoType>(null);

	useEffect(() => {
		(async () => {
			const info = await getUserInfo();
			setUserInfo(info);
		})();
	}, []);

	const checkInputDisabled = (): boolean => {
		if (input.length !== 0) {
			return false;
		}
		return true;
	};
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event;
		setInput(value);
	};
	const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = event;
		if (!files) {
			return;
		}

		const file = files[0];
		if (!file.type.startsWith("image/")) {
			alert("이미지 파일만 등록 가능합니다.");
		}
		const MAX_SIZE = 5 * 1024 * 1024 * 1024;
		if (file.size > MAX_SIZE) {
			alert("5GB 미만의 파일만 등록 가능합니다.");
		}

		const url = URL.createObjectURL(file);
		setPreview(url);

		// 유니크한 이름으로 업로드 url 생성
		const formData = new FormData();
		const ext = file.name.split(".").pop();
		const uniqueName = `${crypto.randomUUID()}.${ext}`;
		setUuid(uniqueName);
		formData.append("filename", uniqueName);
		formData.append("contentType", file.type);

		const result = await getSignedUploadUrl(formData);

		if (!result?.url) {
			alert("URL 생성 실패");
			return;
		}

		setSignedUploadUrl(result.url);
	};
	const onSubmit = handleSubmit(async (data: ReplyType) => {
		const file = inputRef.current?.files?.[0];
		const newForm = new FormData();

		if (file && signedUploadUrl !== null) {
			const success = await uploadToSignedUrl(signedUploadUrl, file);
			if (success) {
				const publicUrl = `https://${process.env.NEXT_PUBLIC_WORK_DOMAIN}/${uuid}`;
				newForm.set("url", publicUrl);
			} else {
				alert("업로드 실패");
			}
		} else {
			newForm.set("url", "");
		}
		newForm.set("reply", data.reply);
		newForm.set("userId", userInfo?.id + "");
		newForm.set("tweetId", tweetId + "");

		callSumit();
		await uploadReply(newForm);
	});
	const onValid = async () => {
		await onSubmit();
	};

	return (
		<div className="border  border-neutral-600 w-full rounded-t-2xl relative">
			{userInfo ? (
				<form action={onValid}>
					<div className="absolute size-5 left-3 top-3">
						<UserIcon />
					</div>
					<Input
						$name="reply"
						{...register("reply")}
						required
						placeholder="Post your reply"
						onChange={onChange}
						$errors={[errors.reply?.message ?? ""]}
					/>

					<div
						className="aspect-square mt-3 rounded-2xl overflow-hidden"
						style={{
							backgroundImage: `url(${preview})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							display: `${preview === "" ? "none" : "flex"}`,
						}}
					></div>
					<div className="flex items-center p-2 justify-between ">
						<div className="w-5"></div>
						<div className="aspect-square flex-1 h-5 *:hover:cursor-pointer text-blue-600 flex items-center gap-5 font-light">
							<label htmlFor="photo">
								<PhotoIcon className="size-5" />
							</label>
							<input
								ref={inputRef}
								onChange={onImageChange}
								type="file"
								id="photo"
								name="photo"
								accept="image/*"
								className="hidden"
							/>
							<GifIcon className="size-5" />
						</div>
						<div className="w-20 h-10">
							<Button $text="Reply" $btn_type="white" $disabled={checkInputDisabled()} />
						</div>
					</div>
				</form>
			) : null}
		</div>
	);
}
