import { IDENTITY_ATTRIBUTE } from "./constants";

/**
 * 秘匿された要素を生成する
 */
export const createHiddenElement = <K extends keyof HTMLElementTagNameMap>(
	tagName: K,
) => {
	const element = document.createElement(tagName);

	element.setAttribute(IDENTITY_ATTRIBUTE.NAME, IDENTITY_ATTRIBUTE.VALUE);
	element.style.width = "0";
	element.style.height = "0";
	element.style.overflow = "hidden";
	element.style.position = "absolute";

	document.body.appendChild(element);

	return element;
};
