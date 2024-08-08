import { getHiddenElement } from "./dom";
import { renderError } from "./renderer";

type OnTickHandler = (
	canvas: HTMLCanvasElement,
	options: { video: HTMLVideoElement },
) => void;

/**
 * ストリーミングを行う画面を描画するクラス
 */
export class StreamCanvas {
	private onTickHandlers = new Set<OnTickHandler>();

	public constructor() {
		this.tick();
	}

	private tick() {
		requestAnimationFrame(() => this.tick());

		const canvas = getHiddenElement("canvas");
		const video = getHiddenElement("video");

		if (!canvas || !video || video.videoWidth === 0 || video.videoHeight === 0)
			return;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		try {
			for (const handler of this.onTickHandlers) {
				handler(canvas, { video });
			}
		} catch (err) {
			console.error(err);

			renderError(canvas, video);
		}
	}

	public onTick(handler: OnTickHandler) {
		this.onTickHandlers.add(handler);

		return () => {
			this.onTickHandlers.delete(handler);
		};
	}
}
