import type { IVarSelectOption } from "react-var-ui";
import * as v from "valibot";
import { storage } from "wxt/storage";

type InferKey<T extends IVarSelectOption[]> = T[number]["key"];

const configSchema = v.object({
	enableByDefault: v.optional(v.boolean(), false),
});

export type ConfigSchema = v.InferOutput<typeof configSchema>;

export const initialConfig = v.getDefaults(configSchema);

export const configStorage = storage.defineItem<ConfigSchema>("local:config", {
	version: 1,
});
