import styles from "./MenuBox.module.css";

type MenuBoxProps = {
  children: React.ReactNode;
};

function MenuBox(props: MenuBoxProps) {
  return <div className={styles.box}>{props.children}</div>;
}

export default MenuBox;
