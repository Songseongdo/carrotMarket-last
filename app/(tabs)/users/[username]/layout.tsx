import { redirect } from "next/navigation";
import { getLikes, getPost, getUser } from "./actions";
import Profile from "./profile";
import Tabs from "./(components)/tabs";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const user = await getUser();
	if (!user) redirect("/");

	const tweets = await getPost();
	const likes = await getLikes();

	return (
		<div className="flex flex-col">
			<Profile user={user} tweets={tweets} likes={likes} />

			<Tabs user={user} />

			<main>{children}</main>
		</div>
	);
}
