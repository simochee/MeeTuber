import { defineConfig } from "wxt";

export default defineConfig({
	manifest: {
		name: "MeeTuber",
		description: "Customizing Google Meet screen sharing.",
		permissions: [],
	},
	outDir: "dist",
	modules: ["@wxt-dev/module-react"],
});
