import styles from "./WhiteKey.module.css";
import { playNote } from "../../utils/audioHandler";

type WhiteKeyProps = {
  children?: React.ReactNode; // Black Key Children.
  note: string;
};

function WhiteKey(props: WhiteKeyProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.key} whiteKey`}
        id={props.note}
        onMouseDown={(event) => {
          if (!event.shiftKey) {
            playNote(props.note);
          }
        }}
      >
        <span className={styles.noteName}>{props.note}</span>
      </div>
      {props.children}
    </div>
  );
}

export default WhiteKey;
