import styles from "./MenuOption.module.css";

type MenuOptionProps = {
  children: React.ReactNode;
  title: string;
  backgroundColor?: "#9cacd5";
};

function MenuOption(props: MenuOptionProps) {
  return (
    <div
      className={styles.box}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <h2 className={styles.title}>{props.title}</h2>
      {props.children}
    </div>
  );
}

export default MenuOption;
