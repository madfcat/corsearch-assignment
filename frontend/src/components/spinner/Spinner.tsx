import classNames from "classnames";
import styles from "./styles.module.scss";

type Props = { className?: string };

export default function Spinner({ className }: Props) {
	return <div className={classNames(styles["spinner"], className)}></div>;
}
