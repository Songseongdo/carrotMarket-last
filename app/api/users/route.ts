import { NextResponse } from "next/server";
import { getUsers } from "@/app/(tabs)/search/actions";

export async function POST(req: Request) {
	const { text } = await req.json();
	const result = await getUsers(text);
	return NextResponse.json(result);
}
