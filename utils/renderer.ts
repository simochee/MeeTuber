export type RendererResult = { width: number; height: number };

/**
 * 画面共有を描画する
 */
export const renderScreenShare = (
	canvas: HTMLCanvasElement,
	video: HTMLVideoElement,
): RendererResult => {
	const ctx = canvas.getContext("2d");
	const { videoWidth: width, videoHeight: height } = video;

	if (ctx) {
		ctx.drawImage(video, 0, 0, width, height);
	}

	return { width, height };
};

/**
 * エラーメッセージを描画する
 */
export const renderError = (
	canvas: HTMLCanvasElement,
	video: HTMLVideoElement,
	error: unknown,
): RendererResult => {
	const message = error instanceof Error ? error.message : String(error);
	const ctx = canvas.getContext("2d");
	const result = renderScreenShare(canvas, video);

	if (ctx) {
		ctx.font = "bold 32px monospace";
		ctx.fillStyle = "red";
		ctx.fillText(message, 16, 16);
	}

	return result;
};
