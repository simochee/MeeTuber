import { defineContentScript } from "wxt/sandbox";
import { GOOGLE_MEET_MATCH } from "~/utils/constants";
import { renderScreenShare } from "~/utils/renderer";
import { StreamCanvas } from "~/utils/stream-canvas";

export default defineContentScript({
	runAt: "document_idle",
	matches: [GOOGLE_MEET_MATCH],
	async main() {
		const config = await configStorage.getValue();

		const streamCanvas = new StreamCanvas();

		streamCanvas.onTick((canvas, { video }) => {
			if (!getGlobalValue("enabled")) {
				return renderScreenShare(canvas, video);
			}
		});
	},
});
