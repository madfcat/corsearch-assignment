import styles from "./styles.module.scss";

type Props = {
	contextMenu: {
		lat: number;
		lon: number;
		x: number;
		y: number;
	} | null;
	handleSelect: (option: "start" | "end") => void;
};

export default function StartEndMenu({ contextMenu, handleSelect }: Props) {
	if (!contextMenu) return null;

	return (
		<div
			className={styles["start-end-menu"]}
			style={{
				top: contextMenu.y,
				left: contextMenu.x,
			}}
		>
			<div>
				<button onClick={() => handleSelect("start")}>
					Direction from here
				</button>
			</div>
			<div>
				<button onClick={() => handleSelect("end")}>Direction to here</button>
			</div>
		</div>
	);
}
