import { defineContentScript } from "wxt/sandbox";

export default defineContentScript({
	runAt: "document_idle",
	matches: [],
	async main() {},
});
