import styles from "./styles.module.scss";
// import Refresh from "@material-design-icons/svg/round/refresh.svg?react";
import ArrowForward from "@material-design-icons/svg/round/arrow_forward.svg?react";
import Bus from "@material-design-icons/svg/round/directions_bus.svg?react";
import Ferry from "@material-design-icons/svg/round/directions_boat.svg?react";
import Tram from "@material-design-icons/svg/round/tram.svg?react";
import Rail from "@material-design-icons/svg/round/directions_railway.svg?react";
import Subway from "@material-design-icons/svg/round/subway.svg?react";
import Walk from "@material-design-icons/svg/round/directions_walk.svg?react";
import PriorityHigh from "@material-design-icons/svg/round/priority_high.svg?react";
import Update from "@material-design-icons/svg/round/update.svg?react";
import CO2 from "@material-design-icons/svg/round/co2.svg?react";
import Schedule from "@material-design-icons/svg/round/schedule.svg?react";
import Timer from "@material-design-icons/svg/round/timer.svg?react";
import SyncAlt from "@material-design-icons/svg/round/sync_alt.svg?react";
import ArrowDropUp from "@material-design-icons/svg/round/arrow_drop_up.svg?react";
import ArrowDropDown from "@material-design-icons/svg/round/arrow_drop_down.svg?react";
import EnergySavingLeaf from "@material-design-icons/svg/round/energy_savings_leaf.svg?react";
import classNames from "classnames";

type Props = {
	svgIconName: string;
	fill?: string;
	className?: string;
};

const ICON_MAP: Record<string, React.FC | undefined> = {
	// refresh: Refresh,
	update: Update,
	arrowForward: ArrowForward,
	bus: Bus,
	ferry: Ferry,
	tram: Tram,
	rail: Rail,
	subway: Subway,
	walk: Walk,
	priority_high: PriorityHigh,
	co2: CO2,
	schedule: Schedule,
	timer: Timer,
	sync_alt: SyncAlt,
	arrow_drop_up: ArrowDropUp,
	arrow_drop_down: ArrowDropDown,
	energy_savings_leaf: EnergySavingLeaf,
};

export default function Icon({ svgIconName, fill = "black", className }: Props) {
	const IconComponent = ICON_MAP[svgIconName] || PriorityHigh;

	return (
		<span className={classNames(styles["icon"], className)}>
			<IconComponent style={{ fill }} />
		</span>
	);
}
