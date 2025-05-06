"use client";

import { useRouter } from "next/navigation";
import styles from "../styles/error.module.css";

export default function Error() {
	const route = useRouter();
	const onClick = () => {
		route.back();
	};
	return (
		<div className={styles.container}>
			<div className={styles.title}>에러가 발생 하였습니다.</div>

			<div className={styles.btn} onClick={onClick}>
				&larr; 이전 화면으로 돌아가기
			</div>
		</div>
	);
}
