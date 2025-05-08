import { redirect } from "next/navigation";
import { getIdFromUserId } from "@/util/async";
import UserLayoutShell from "../../../../components/user-layout-shell";

export default async function SearchIdLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { userid: string };
}) {
	const id = await getIdFromUserId(params.userid);
	if (!id) redirect("/");

	return (
		<UserLayoutShell id={id!} searched={true}>
			{children}
		</UserLayoutShell>
	);
}
