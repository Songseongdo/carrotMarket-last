"use client";

import MovePrev from "@/components/move-prev";

export default function RootNotFound() {
	return (
		<div className="pt-12">
			<div className="text-red-700 text-2xl">페이지가 존재하지 않습니다</div>

			<MovePrev />
		</div>
	);
}
