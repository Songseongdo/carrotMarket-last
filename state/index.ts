"use client";

import { atom } from "recoil";

export const popupVisible = atom({
	key: "popup_visible",
	default: false,
});
