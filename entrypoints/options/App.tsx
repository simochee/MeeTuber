import { isDeepEqual } from "@antfu/utils";
import { VarButton, VarCategory, VarToggle, VarUI } from "react-var-ui";
import {
	type ConfigSchema,
	configStorage,
	initialConfig,
} from "~/utils/config";

export const App = () => {
	const [pending, setPending] = useState(false);
	const [initialValues, setInitialValues] = useState<ConfigSchema | null>(null);
	const [values, setValues] = useState<ConfigSchema>(initialConfig);

	const changed = !isDeepEqual(initialValues, values);

	const handleSubmit = async (values: ConfigSchema) => {
		setPending(true);

		try {
			await Promise.all([
				configStorage.setValue(values),
				new Promise((resolve) => setTimeout(resolve, 1500)),
			]);

			setInitialValues(values);
		} finally {
			setPending(false);
		}
	};

	useEffect(() => {
		configStorage.getValue().then((value) => {
			setValues(value);
			setInitialValues(value);
		});
	}, []);

	return (
		<VarUI values={values} onChange={setValues}>
			<VarButton
				className="sticky-top"
				buttonLabel={pending ? "Saving..." : changed ? "Save" : "No Changes"}
				disabled={pending || !changed}
				onClick={() => handleSubmit(values)}
			/>
			<VarCategory label="General">
				<VarToggle path="enableByDefault" label="Enable by default" />
			</VarCategory>
		</VarUI>
	);
};
