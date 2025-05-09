import { NextResponse } from "next/server";
import { getCachedtweetInfo } from "@/app/(tabs)/tweets/[id]/actions";

export async function POST(req: Request) {
	const { id } = await req.json();
	const result = await getCachedtweetInfo(+id);
	return NextResponse.json(result);
}
