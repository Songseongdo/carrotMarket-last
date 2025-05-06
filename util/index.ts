export type FormFields =
	| "id"
	| "email"
	| "password"
	| "username"
	| "confirm_password"
	| "phonenumber"
	| "verifycode"
	| "prev_password"
	| "comment";
export type FormActionResult =
	| null
	| { success: true }
	| { success: false; fieldErrors: Partial<Record<FormFields, string[]>> };

export function getError(state: FormActionResult, name: FormFields): string[] {
	if (state && !state.success && state.fieldErrors) {
		return state.fieldErrors[name] ?? [];
	}
	return [];
}

export function formatToTimeAgo(date: Date): string {
	const minInMs = 1000 * 60;
	const hourInMs = 1000 * 60 * 60;
	const dayInMs = 1000 * 60 * 60 * 24;

	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = now - time;
	const formatter = new Intl.RelativeTimeFormat("ko");

	// 초단위 일때 에러?

	if (diff < minInMs) {
		return "1분 전";
	} else if (diff < hourInMs) {
		return formatter.format(Math.round(-diff / minInMs), "minute");
	} else if (diff < dayInMs) {
		return formatter.format(Math.round(-diff / hourInMs), "hour");
	} else {
		return formatter.format(Math.round(-diff / dayInMs), "day");
	}
}
