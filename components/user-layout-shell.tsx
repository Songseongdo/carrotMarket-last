import Profile from "@/components/profile";
import UserInfoTabs from "./userinfo-tabs";
import { getPost, getUserInfo } from "@/util/async";
import { redirect } from "next/navigation";

interface IUserLayoutShellProps {
	id: number;
	searched: boolean;
	children: React.ReactNode;
}

export default async function UserLayoutShell({ id, searched = false, children }: IUserLayoutShellProps) {
	const user = await getUserInfo(id);
	if (!user) redirect("/");

	const tweets = await getPost(id);

	return (
		<div className="flex flex-col">
			<Profile user={user} tweets={tweets} $isEdit={!searched} />
			<UserInfoTabs user={user} searched={searched} />
			<main className="p-2">{children}</main>
		</div>
	);
}
