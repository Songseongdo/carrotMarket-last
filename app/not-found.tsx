"use client";

import { useRouter } from "next/navigation";
import styles from "../styles/error.module.css";

export default function RootNotFound() {
	const route = useRouter();
	const onClick = () => {
		route.back();
	};
	return (
		<div className={styles.container}>
			<div className={styles.title}>페이지가 존재하지 않습니다.</div>

			<div className={styles.btn} onClick={onClick}>
				&larr; 이전 화면으로 돌아가기
			</div>
		</div>
	);
}
