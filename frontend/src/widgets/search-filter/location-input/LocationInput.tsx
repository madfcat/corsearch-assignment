import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "../../../store/store";
import { setEndName, setStartName } from "../../../features/mapSlice";
import { BACKEND_URL } from "../../../config";
import { useState } from "react";
import { PeliasResponse } from "../../../types/types";

type Props = {
	title: string;
	name: "from" | "to";
	placeholder?: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
function debounce<T extends (...args: any[]) => Promise<any>>(
	func: T,
	timeout: number = 300
) {
	console.log("debounce");
	let timer: ReturnType<typeof setTimeout>;
	let resolveRef: ((value: Awaited<ReturnType<T>>) => void) | null = null;

	return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
		return new Promise((resolve) => {
			if (timer) clearTimeout(timer);
			resolveRef = resolve;

			timer = setTimeout(async () => {
				const result = await func(...args);
				if (resolveRef) resolveRef(result);
			}, timeout);
		});
	};
}

const debouncedChange = debounce(
	async (text: string): Promise<PeliasResponse> => {
		console.log("handle change from debounce");
		const res = await fetch(`${BACKEND_URL}/geo/autocomplete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});
		if (!res) {
			throw new Error(`Response failed: ${res}`);
		}
		const data = await res.json();
		return data;
	},
	500
);

export default function LocationInput({ title, name, placeholder }: Props) {
	const [features, setFeatures] = useState<PeliasResponse["features"]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const nameValue = useSelector((state: RootState) => {
		if (name === "from") {
			return state.map.startName;
		} else if (name === "to") {
			return state.map.endName;
		}
	});
	const [value, setValue] = useState(nameValue || "");
	const dispatch = useDispatch();

	async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log("handle change!");
		setIsLoading(true);
		e.preventDefault();
		setValue(e.target.value);
		if (!e.target.value) {
			setFeatures([]);
			return;
		}
		const data = await debouncedChange(e.target.value);
		setIsLoading(false);
		console.log("data pelias", data);
		if (data?.features) setFeatures([...data.features]);
		if (name === "from") {
			dispatch(setStartName(e.target.value));
		} else if (name === "to") {
			dispatch(setEndName(e.target.value));
		}
	}

	return (
		<div className={styles["location-input"]}>
			<div className={styles["label-container"]}>
				<label htmlFor={name}>{title}</label>
			</div>
			<div className={styles["input-field"]}>
				<input
					type="text"
					id={name}
					placeholder={placeholder}
					onChange={handleChange}
					value={value}
					list={name}
				/>
				{value && (
					<div className={styles["data-list"]}>
						{features.length > 0 ? (
							features.map((feature) => {
								return (
									<div
										className={styles["data-list-element"]}
										key={feature.properties.id}
									>
										<button>{feature.properties.label}</button>
									</div>
								);
							})
						) : (
							<div>{isLoading ? "Loading..." : "No suggestion..."}</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
