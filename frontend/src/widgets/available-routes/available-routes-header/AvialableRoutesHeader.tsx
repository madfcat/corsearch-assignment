import styles from "./styles.module.scss";
import IconButton from "../../../components/icon-button/IconButton";
import Icon from "../../../components/icon/Icon";
import { useDispatch } from "react-redux";
import { usePlanConnectionQuery } from "../../../gql/graphql";
import { setEdges } from "../../../features/edgesSlice";
import { useState } from "react";

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

	return (
		<div className={styles["trips-header-container"]}>
			<div className={styles["trips-header-text"]}>Available trips</div>
			<div className={styles["trips-header-refresh"]}>
				<IconButton
					ariaLabel="refresh"
					handleClick={handleRefresh}
					disabled={disabled}
				>
					<Icon svgIconName="refresh" />
				</IconButton>
			</div>
		</div>
	);
}
