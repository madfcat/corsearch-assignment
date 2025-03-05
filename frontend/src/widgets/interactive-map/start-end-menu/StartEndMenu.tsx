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
			style={{
				position: "absolute",
				top: contextMenu.y,
				left: contextMenu.x,
				backgroundColor: "white",
				boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
				padding: "8px",
				borderRadius: "5px",
				zIndex: 1000,
			}}
		>
			<button onClick={() => handleSelect("start")}>Set as Start</button>
			<button onClick={() => handleSelect("end")}>Set as End</button>
		</div>
	);
}
