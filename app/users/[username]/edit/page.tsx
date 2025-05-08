import { getLoginUserInfo } from "@/util/async";
import { redirect } from "next/navigation";
import Profile from "./profile";
import React from "react";

export default async function UserProfileEdit() {
	const user = await getLoginUserInfo();
	if (!user) redirect("/home");

	return <Profile user={user} />;
}
