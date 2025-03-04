import { Marker } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const CustomSVG = ({ color, iconSize }: Pick<Props, "color" | "iconSize">) => {
	const strokeWidth = 4;
	const radius = iconSize.width / 2 - strokeWidth;
	return (
		<svg
			width={String(iconSize.width)}
			height={String(iconSize.height)}
			viewBox={`0 0 ${iconSize.width} ${iconSize.height}`}
			fill="white"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx={String(iconSize.width / 2)}
				cy={String(iconSize.height / 2)}
				r={String(radius)}
				stroke={color}
				strokeWidth={String(strokeWidth)}
				fill="white"
			/>
		</svg>
	);
};

const createMarkerSvgIcon = (
	color: Props["color"],
	iconSize: Props["iconSize"]
) =>
	L.divIcon({
		className: "custom-marker",
		html: renderToStaticMarkup(<CustomSVG color={color} iconSize={iconSize} />),
		iconSize: [iconSize.width, iconSize.height],
		iconAnchor: [iconSize.width / 2, iconSize.height / 2],
	});

type Props = {
	position: LatLngExpression;
	color: string;
	iconSize: { width: number; height: number };
	children: React.ReactNode;
};
export default function RoundMarker({
	position,
	color,
	iconSize,
	children,
}: Props) {
	return (
		<Marker position={position} icon={createMarkerSvgIcon(color, iconSize)}>
			{children}
		</Marker>
	);
}
