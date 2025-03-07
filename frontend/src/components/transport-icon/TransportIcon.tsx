import styles from "./styles.module.scss";
import { Mode } from "../../gql/graphql";
import Icon from "../icon/Icon";

type Props = {
	mode: Mode | null | undefined;
	fill?: string;
};

const getIconSvgName = (mode: Props["mode"]) => {
	switch (mode) {
		case Mode.Walk:
			return "walk";
		case Mode.Bus:
			return "bus";
		case Mode.Ferry:
			return "ferry";
		case Mode.Rail:
			return "rail";
		case Mode.Tram:
			return "tram";
		case Mode.Subway:
			return "subway";
		default:
			return null;
	}
};

export default function TransportIcon({ mode, fill = "black" }: Props) {
	return (
		<span className={styles["transport-icon"]}>
			<Icon svgIconName={getIconSvgName(mode) ?? ""} fill={fill} />
		</span>
	);
}
