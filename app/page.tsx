import Link from "next/link";
import Button from "../components/button";
import getSession from "../lib/session";
import db from "../lib/db";
import { redirect } from "next/navigation";
import Tweets from "./(tabs)/tweets/page";
import Tweet from "@/components/tweet";

async function getUser() {
	const sesstion = await getSession();
	if (sesstion.id) {
		return await db.user.findUnique({
			where: {
				id: sesstion.id,
			},
		});
	} else {
		return redirect("/login");
	}
}

export default async function RootPage() {
	const user = await getUser();
	const logout = async () => {
		"use server";
		const session = await getSession();
		await session.destroy();

		redirect("/login");
	};

	return (
		<div className="flex flex-col items-center min-h-screen pt-10">
			{user ? (
				<>
					{/* <div className="flex items-center justify-center w-full">
						<div className="text-xs flex mr-3">
							<Link href="/profile" className="relative size-10">
								<svg
									data-slot="icon"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
									></path>
								</svg>
								<svg
									data-slot="icon"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									className="size-4 absolute bottom-0 right-0"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
									></path>
								</svg>
							</Link>
						</div>
						<h2 className="text-xl">
							{user?.username}
							<span className="text-sm"> 님</span> <br />
						</h2>
						<form action={logout} className="w-1/5 h-1/2 ml-10 ">
							<Button $text="Log Out"></Button>
						</form>
					</div> */}
					<div className="mt-3 w-full">
						<Tweet />
					</div>

					<Tweets />
				</>
			) : (
				<>
					<div className="text-xl mb-10">로그인하고 편리하게 이용하세요.</div>

					<div className="flex gap-5 w-xs mb-3">
						<Link
							href="/login"
							className="flex justify-center items-center w-full h-10 rounded-full disabled:bg-neutral-600 disabled:text-neutral-300 disabled:cursor-not-allowed bg-neutral-400 hover:bg-neutral-500"
						>
							로그인
						</Link>
					</div>
					<div className="flex justify-between w-[250px] text-xs">
						<Link href="/" className="hover:border-b-1">
							아이디 찾기
						</Link>
						<div>|</div>
						<Link href="/" className="hover:border-b-1">
							비밀번호 찾기
						</Link>
						<div>|</div>
						<Link href="/create-account" className="hover:border-b-1">
							회원가입
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
