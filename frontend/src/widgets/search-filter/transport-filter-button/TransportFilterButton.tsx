import FilterButton from "../../../components/filter-button/FilterButton";
import TransportIcon from "../../../components/transport-icon/TransportIcon";
import { Mode } from "../../../gql/graphql";
import pickTransportColor from "../../../shared/pickTransportColor";

type Props = {
	mode?: Mode | null | undefined;
	text: string;
	className?: string;
};

export default function TransportFilterButton({
	mode = null,
	text,
	className = "",
}: Props) {
	const color = mode ? pickTransportColor(mode) : "";

	return (
		<FilterButton className={className} color={color}>
			{mode && <TransportIcon mode={mode} fill={color} />}
			<span>{text}</span>
		</FilterButton>
	);
}
