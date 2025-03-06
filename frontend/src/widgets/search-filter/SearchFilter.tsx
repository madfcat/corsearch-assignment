import IconButton from "../../components/icon-button/IconButton";
import Icon from "../../components/icon/Icon";
import LocationInput from "./location-input/LocationInput";
import styles from "./styles.module.scss";

export default function SearchFilter() {
	// const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data)
	return (
		<div className={styles["search-filter"]}>
			<div className={styles["location-destination"]}>
					<form className={styles["location-form"]} onSubmit={(e) => e.preventDefault()}>
						<div>
							<LocationInput
								title="From:"
								name="from"
								placeholder="Location"
							/>
						</div>
						<div>
							<IconButton ariaLabel="swap" handleClick={() => {}}>
								<Icon svgIconName="sync_alt" />
							</IconButton>
						</div>
						<div>
							<LocationInput
								title="To:"
								name="to"
								placeholder="Destination"
							/>
						</div>
					</form>
			</div>
		</div>
	);
}
