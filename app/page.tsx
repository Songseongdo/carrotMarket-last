import Link from "next/link";
import getSession from "../lib/session";
import { redirect } from "next/navigation";
import React from "react";
import PopupLinks from "@/components/popup-links";

async function getUser() {
	const session = await getSession();
	if (session.id) {
		redirect("/home");
	} else {
		// return redirect("/login");
		return null;
	}
}

export default async function RootPage() {
	const user = await getUser();

	return (
		<div className="flex flex-col items-center min-h-screen pt-10">
			{!user && (
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
					<PopupLinks />
				</>
			)}
		</div>
	);
}
