import { getLoginUserInfo } from "@/util/async";
import SideBarClient from "./side-bar-client";
import { redirect } from "next/navigation";

export default async function SideBar() {
	const user = await getLoginUserInfo();
	if (!user) redirect("/");

	return (
		<>
			<SideBarClient user={user} />
		</>
	);
}
