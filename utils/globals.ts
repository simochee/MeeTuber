type GlobalValues = {
	enabled: boolean;
};

const toKey = (key: string) => `__wxt__${key}__`;

/**
 * グローバル変数を取得する
 */
export const getGlobalValue = <K extends keyof GlobalValues>(
	key: K,
): GlobalValues[K] => {
	// @ts-expect-error
	return window[toKey(key)];
};

/**
 * グローバル変数を設定する
 */
export const setGlobalValue = <
	K extends keyof GlobalValues,
	V extends GlobalValues[K],
>(
	key: K,
	value: V,
): void => {
	// @ts-expect-error
	window[toKey(key)] = value;
};
