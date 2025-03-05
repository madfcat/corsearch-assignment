import styles from "./styles.module.scss";
import TransportIcon from "../../../components/transport-icon/TransportIcon";
import { Leg } from "../../../types/types";
import Icon from "../../../components/icon/Icon";

type Props = {
	legs: Leg[];
};

export default function RouteName({ legs }: Props) {
	const routes = legs.map((leg, index) => {
		const mode = leg?.mode;
		const route = leg?.route?.shortName;
		const separator =
			index + 1 !== legs.length ? <Icon svgIconName="arrowForward" /> : null;
		return (
			<div className={styles["route-leg-name"]} key={index}>
				<TransportIcon mode={mode} />
				<div>{route}</div>
				{separator}
			</div>
		);
	});

	return <div className={styles["route-name"]}>{routes}</div>;
}
