import { IDENTITY_ATTRIBUTE } from "./constants";

/**
 * セレクタに該当する要素が存在するまで待機する
 */
export const waitFor = (selectors: string, ms = 1000) => {
	return new Promise<Element>((resolve) => {
		const el = document.querySelector(selectors);

		if (el) {
			resolve(el);
		} else {
			new Promise((resolve) => setTimeout(resolve, ms))
				.then(() => waitFor(selectors, ms))
				.then(resolve);
		}
	});
};

/**
 * クラスを付け替える
 */
export const toggleClass = (
	element: Element,
	className0: string,
	className1: string,
) => {
	if (element.classList.replace(className1, className0)) return className0;

	element.classList.replace(className0, className1);

	return className1;
};

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
