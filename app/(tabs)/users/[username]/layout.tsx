import getSession from "@/lib/session";
import UserLayoutShell from "../../../../components/user-layout-shell";
import { redirect } from "next/navigation";
import React from "react";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	if (!session) redirect("/");

	return (
		<UserLayoutShell id={session.id!} searched={false}>
			{children}
		</UserLayoutShell>
	);
}
