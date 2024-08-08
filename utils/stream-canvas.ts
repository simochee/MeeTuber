import { getHiddenElement } from "./dom";
import { type RendererResult, renderError } from "./renderer";

type OnTickHandlerResult = RendererResult | undefined;
type OnTickHandler = (
	canvas: HTMLCanvasElement,
	options: { video: HTMLVideoElement },
) => OnTickHandlerResult;

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

		let width = video.videoWidth;
		let height = video.videoHeight;

		try {
			for (const handler of this.onTickHandlers) {
				const result = handler(canvas, { video });

				if (result) {
					width = result.width;
					height = result.height;
				}
			}
		} catch (err) {
			console.error(err);

			({ width, height } = renderError(canvas, video, err));
		}

		canvas.width = width;
		canvas.height = height;
	}

	public onTick(handler: OnTickHandler) {
		this.onTickHandlers.add(handler);

		return () => {
			this.onTickHandlers.delete(handler);
		};
	}
}
