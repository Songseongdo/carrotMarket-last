import { useSetRecoilState } from "recoil";
import Button from "./button";
import { popupVisible } from "../state";

export default function SuccessMsg() {
	const setPopup = useSetRecoilState(popupVisible);

	return (
		<div className="w-screen h-screen bg-neutral-900/90 absolute top-0 pt-100 ">
			<div className="w-1/2 mx-auto flex flex-col justify-center items-center">
				<div className="mb-5 text-center text-xl">로그인 성공하였습니다.</div>
				<div className="w-3/5 ">
					<Button $text="확인" $callFn={() => setPopup(false)} />
				</div>
			</div>
		</div>
	);
}
