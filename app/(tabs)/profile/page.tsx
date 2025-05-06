import { redirect } from "next/navigation";
import { getUser } from "./actions";

import Profile from "./profile";

export default async function Page() {
	const user = await getUser();

	if (!user) redirect("/");

	return <Profile user={user} />;
}
