import styles from "./styles.module.scss";
import IconButton from "../../../components/icon-button/IconButton";
import Icon from "../../../components/icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { usePlanConnectionQuery } from "../../../gql/graphql";
import { setEdges } from "../../../features/edgesSlice";
import { useState } from "react";
import { RootState } from "../../../store/store";

const coords = {
	originLat: 60.179918,
	originLon: 24.939700,
	destinationLat: 60.19956365,
	destinationLon: 24.95928,
};

export default function AvailableRoutesHeader() {
	const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	const { refetch } = usePlanConnectionQuery({
		variables: coords,
	});
	const availableRoutesCount = useSelector((state: RootState) => state).edges.edges.length;

	async function handleRefresh() {
		console.log("Refresh");
		try {
			setDisabled(true);
			const { data } = await refetch(); // Triggers a new fetch
			const edges = data?.planConnection?.edges || [];
			dispatch(setEdges(edges));
			console.log("Refreshed data:", edges);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setDisabled(false);
		}
	}

	const availableRoutesCountString = availableRoutesCount ? ` (${availableRoutesCount})` : "";
	return (
		<div className={styles["trips-header-container"]}>
			<div className={styles["trips-header-text"]}>{`Available trips${availableRoutesCountString}`}</div>
			<div className={styles["trips-header-refresh"]}>
				<IconButton
					ariaLabel="refresh"
					handleClick={handleRefresh}
					disabled={disabled}
				>
					<Icon svgIconName="update" />
				</IconButton>
			</div>
		</div>
	);
}
