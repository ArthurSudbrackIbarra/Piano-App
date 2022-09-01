import styles from "./MenuOption.module.css";

type MenuOptionProps = {
  children?: React.ReactNode;
  title: string;
  description: string;
};

function MenuOption(props: MenuOptionProps) {
  return (
    <div className={styles.box}>
      <h2 className={styles.title}>{props.title}</h2>
      {props.children}
      <p className={styles.descripttion}>{props.description}</p>
    </div>
  );
}

export default MenuOption;
