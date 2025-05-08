"use client";

import Input from "./input";
import Button from "./button";
import { useRef, useState } from "react";
import { PhotoIcon, GifIcon } from "@heroicons/react/24/outline";
import { uploadTweet, getSignedUploadUrl } from "@/app/(tabs)/tweets/actions";
import { FormActionResult } from "@/util";
import { useFormState } from "react-dom";

export default function Tweet() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [input, setInput] = useState("");
	const [preview, setPreview] = useState("");
	const [signedUploadUrl, setSignedUploadUrl] = useState("");
	const [uuid, setUuid] = useState("");

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
	const checkInputDisabled = (): boolean => {
		if (input.length !== 0 || preview !== "") {
			return false;
		}
		return true;
	};

	// 이미지 업로드
	async function uploadToSignedUrl(signedUrl: string, file: File) {
		try {
			const res = await fetch(signedUrl, {
				method: "PUT",
				headers: {
					"Content-Type": file.type,
				},
				body: file,
			});

			return res.ok;
		} catch (err) {
			console.error("업로드 에러", err);
			return false;
		}
	}

	const interceptAction = async (_: any, formData: FormData): Promise<FormActionResult> => {
		const file = inputRef.current?.files?.[0];
		if (!file) {
			alert("파일 선택 필요");
			return {
				success: true,
			};
		}

		const success = await uploadToSignedUrl(signedUploadUrl, file);
		if (success) {
			const publicUrl = `https://${process.env.NEXT_PUBLIC_WORK_DOMAIN}/${uuid}`;
			formData.set("url", publicUrl);
		} else {
			alert("업로드 실패");
		}

		return uploadTweet(_, formData);
	};
	const [_, dispatch] = useFormState<FormActionResult, FormData>(interceptAction, null);

	return (
		<div className="border  border-neutral-600 w-full rounded-t-2xl">
			<form action={dispatch}>
				<Input $name="comment" required placeholder="What's happening?" onChange={onChange} />

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
						<Button $text="Post" $btn_type="white" $disabled={checkInputDisabled()} />
					</div>
				</div>
			</form>
		</div>
	);
}
