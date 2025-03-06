import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "../../../store/store";
import {
	setStartName,
	setStartPoint,
	setEndName,
	setEndPoint,
} from "../../../features/mapSlice";
import { BACKEND_URL } from "../../../config";
import { useState } from "react";
import { PeliasResponse } from "../../../types/types";

type Props = {
	title: string;
	name: "from" | "to";
	placeholder?: string;
};

function convertGeometryCoordanitesToPoint(arr: [number, number]) {
	return { lat: arr[1], lng: arr[0] };
}

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
	// const [isComplete, setIsComplete] = useState(false);
	const nameValue = useSelector((state: RootState) => {
		if (name === "from") {
			return state.map.startName;
		} else if (name === "to") {
			return state.map.endName;
		}
	});
	const dispatch = useDispatch();
	const [value, setValue] = useState(nameValue || "");

	async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log("handle change!");
		if (name === "from")
			dispatch(setStartName(""));
		if (name === "to")
			dispatch(setEndName(""));
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
	}

	function handleClick(feature: PeliasResponse["features"][number]) {
		setValue(feature.properties.label);
		if (name === "from") {
			dispatch(setStartName(feature.properties.label));
			dispatch(
				setStartPoint(
					convertGeometryCoordanitesToPoint(feature.geometry.coordinates)
				)
			);
		} else if (name === "to") {
			dispatch(setEndName(feature.properties.label));
			dispatch(
				setEndPoint(
					convertGeometryCoordanitesToPoint(feature.geometry.coordinates)
				)
			);
		}
		setFeatures([]);
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
					autoComplete="off"
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
										<button onClick={() => handleClick(feature)}>
											{feature.properties.label}
										</button>
									</div>
								);
							})
						) : (
							!nameValue && <div className={styles["data-list-status"]}>
								{isLoading ? "Loading..." : "No suggestion..."}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
