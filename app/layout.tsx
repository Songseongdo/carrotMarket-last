import { Metadata } from "next";
import RecoilProvider from "../components/recoilProvider";
import "../styles/global.css";
import React from "react";

export const metadata: Metadata = {
	title: {
		template: "%s | Tweets",
		default: "Tweets Follow",
	},
	description: "트위터 따라 하기",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="bg-gray-900 text-white h-screen m-auto max-w-[800px]">
				<div>
					<RecoilProvider>{children}</RecoilProvider>
				</div>
			</body>
		</html>
	);
}
