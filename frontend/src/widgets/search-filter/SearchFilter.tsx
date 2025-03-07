import { useDispatch } from "react-redux";
import IconButton from "../../components/icon-button/IconButton";
import Icon from "../../components/icon/Icon";
import LocationInput from "./location-input/LocationInput";
import styles from "./styles.module.scss";
import { swapStartWithEnd } from "../../features/mapSlice";
import { Mode } from "../../gql/graphql";
import TransportFilterButton from "./transport-filter-button/TransportFilterButton";

const transportFilterButtonsData = [
	{ mode: Mode.Bus, text: "Bus" },
	{ mode: Mode.Rail, text: "Rail" },
	{ mode: Mode.Ferry, text: "Ferry" },
	{ mode: Mode.Tram, text: "Tram" },
	{ mode: Mode.Subway, text: "Subway" },
];

const generalFilterButtonsData = [
	{ text: "Faster" },
	{ text: "Less stops" },
	{ text: "Shorter walks" },
	{ text: "Less hill walking" },
	{ text: "Greener" },
	{ text: "Shorter route" },
];

export default function SearchFilter() {
	const dispatch = useDispatch();

	function swapLocations() {
		dispatch(swapStartWithEnd());
	}
	return (
		<div className={styles["search-filter"]}>
			<div className={styles["location-destination"]}>
				<form
					className={styles["location-form"]}
					onSubmit={(e) => e.preventDefault()}
				>
					<div>
						<LocationInput title="From:" name="from" placeholder="Location" />
					</div>
					<div>
						<IconButton ariaLabel="swap" handleClick={swapLocations}>
							<Icon svgIconName="sync_alt" />
						</IconButton>
					</div>
					<div>
						<LocationInput title="To:" name="to" placeholder="Destination" />
					</div>
				</form>
			</div>
			<div className={styles["filter-buttons"]}>
				<div className={styles["filter-buttons-transport"]}>
					{transportFilterButtonsData.map((buttonData) => (
						<TransportFilterButton
							className={styles["filter-button-transport"]}
							mode={buttonData.mode}
							text={buttonData.text}
						/>
					))}
				</div>
				<div className={styles["filter-buttons-general"]}>
					{generalFilterButtonsData.map((buttonData) => (
						<TransportFilterButton
							className={styles["filter-button-transport"]}
							text={buttonData.text}
						/>
					))}
				</div>
				<div></div>
			</div>
		</div>
	);
}
