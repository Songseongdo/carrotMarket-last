import { getUserInfo } from "@/util/async";
import { redirect } from "next/navigation";
import Profile from "./profile";

export default async function UserProfileEdit() {
	const user = await getUserInfo();
	if (!user) redirect("/home");

	return <Profile user={user} />;
}
