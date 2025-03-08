import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/icon-button/IconButton";
import Icon from "../../components/icon/Icon";
import LocationInput from "./location-input/LocationInput";
import styles from "./styles.module.scss";
import { swapStartWithEnd } from "../../features/mapSlice";
import FilterButton from "./filter-button/FilterButton";
import { RootState } from "../../store/store";
import {
	setChosenGeneralButton,
	toggleChosenTransportButton,
} from "../../features/filterSlice";
import classNames from "classnames";
import { sortEdges } from "../../features/edgesSlice";

export default function SearchFilter() {
	const transportFilterButtonsData = useSelector(
		(state: RootState) => state.filter.transportFilterButtonsData
	);
	const generalFilterButtonsData = useSelector(
		(state: RootState) => state.filter.generalFilterButtonsData
	);
	const dispatch = useDispatch();

	function swapLocations() {
		dispatch(swapStartWithEnd());
	}

	function handleFilterButtonClick(index: number) {
		console.log("transport", index);
		dispatch(toggleChosenTransportButton(index));
	}

	function handleGeneralFilterButtonClick(index: number, callbackKey: string) {
		console.log("general", index);
		dispatch(setChosenGeneralButton(index));
		dispatch(sortEdges(callbackKey));
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
					{transportFilterButtonsData.map((buttonData, index) => {
						const handleClick = () => handleFilterButtonClick(index);
						const chosenClassName = !buttonData.chosen
							? styles["filter-button-disabled"]
							: null;
						return (
							<FilterButton
								mode={buttonData.mode}
								className={classNames(
									styles["filter-button-transport"],
									chosenClassName
								)}
								key={index}
								text={buttonData.text}
								handleClick={handleClick}
							/>
						);
					})}
				</div>
				<div className={styles["filter-buttons-general"]}>
					{generalFilterButtonsData.map((buttonData, index) => {
						const handleClick = () =>
							handleGeneralFilterButtonClick(index, buttonData.callbackKey);
						const chosenClassName = !buttonData.chosen
							? styles["filter-button-disabled"]
							: null;
						return (
							<FilterButton
								className={classNames(
									styles["filter-button-transport"],
									chosenClassName
								)}
								key={index}
								text={buttonData.text}
								handleClick={handleClick}
							/>
						);
					})}
				</div>
				<div></div>
			</div>
		</div>
	);
}
