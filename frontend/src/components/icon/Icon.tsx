import styles from "./styles.module.scss";
import Refresh from "@material-design-icons/svg/round/refresh.svg?react";
import ArrowForward from "@material-design-icons/svg/round/arrow_forward.svg?react";
import Bus from "@material-design-icons/svg/round/directions_bus.svg?react";
import Ferry from "@material-design-icons/svg/round/directions_boat.svg?react";
import Tram from "@material-design-icons/svg/round/tram.svg?react";
import Rail from "@material-design-icons/svg/round/directions_railway.svg?react";
import Subway from "@material-design-icons/svg/round/subway.svg?react";
import Walk from "@material-design-icons/svg/round/directions_walk.svg?react";

type Props = {
	svgIconName: string;
};

const ICON_MAP: Record<string, React.FC | undefined> = {
	refresh: Refresh,
	arrowForward: ArrowForward,
	bus: Bus,
	ferry: Ferry,
	tram: Tram,
	rail: Rail,
	subway: Subway,
	walk: Walk,
};

export default function Icon({ svgIconName }: Props) {
	const IconComponent = ICON_MAP[svgIconName];

	if (!IconComponent) {
		throw Error(`Icon ${svgIconName} not found`);
	}

	return (
		<span className={styles["icon"]}>
			<IconComponent />
		</span>
	);
}
