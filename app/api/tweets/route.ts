import { NextResponse } from "next/server";
import { getTweets } from "@/app/(tabs)/search/actions";

export async function POST(req: Request) {
	const { text } = await req.json();
	const result = await getTweets(text);
	return NextResponse.json(result);
}
