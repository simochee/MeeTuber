/**
 * 画面共有を描画する
 */
export const renderScreenShare = (
	canvas: HTMLCanvasElement,
	video: HTMLVideoElement,
): void => {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	const ctx = canvas.getContext("2d");

	if (ctx) {
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	}
};

/**
 * エラーメッセージを描画する
 */
export const renderError = (
	canvas: HTMLCanvasElement,
	video: HTMLVideoElement,
): void => {
	const ctx = canvas.getContext("2d");

	renderScreenShare(canvas, video);

	if (ctx) {
		const message = "Error occurred: Check the console for details.";

		ctx.font = "bold 32px arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText(message, canvas.width / 2, canvas.height / 2);
	}
};
