import { configStorage } from "~/utils/config";
import { GOOGLE_MEET_MATCH, GOOGLE_MEET_SELECTOR } from "~/utils/constants";
import { waitFor } from "~/utils/dom";

export default defineContentScript({
	runAt: "document_idle",
	matches: [GOOGLE_MEET_MATCH],
	async main() {
		const { enableByDefault } = await configStorage.getValue();

		if (!enableByDefault) return;

		const button = await waitFor(GOOGLE_MEET_SELECTOR.COMMENT_TOGGLE_BUTTON);

		if (button instanceof HTMLButtonElement) {
			button.click();
		}
	},
});
