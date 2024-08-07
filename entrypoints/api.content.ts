import { defineContentScript } from "wxt/sandbox";
import { GOOGLE_MEET_MATCH } from "~utils/constants";
import { wrapDisplayMedia } from "~utils/display-media";

export default defineContentScript({
	runAt: "document_end",
	matches: [GOOGLE_MEET_MATCH],
	world: "MAIN",
	main() {
		wrapDisplayMedia();
	},
});
