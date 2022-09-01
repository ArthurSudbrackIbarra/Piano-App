import styles from "./Center.module.css";

type CenterProps = {
  children?: React.ReactNode;
};

function Center(props: CenterProps) {
  return <div className={styles.container}>{props.children}</div>;
}

export default Center;
