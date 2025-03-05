import IconButton from "../../components/icon-button/IconButton";
import Icon from "../../components/icon/Icon";
import styles from "./styles.module.scss";

export default function SearchFilter() {
	return (
		<div className={styles["search-filter"]}>
			<div className={styles["location-destination"]}>
				<div></div>
				<div>
					<IconButton ariaLabel="swap" handleClick={() => {}}>
						<Icon svgIconName="sync_alt" />
					</IconButton>
				</div>
				<div></div>
			</div>
		</div>
	);
}
