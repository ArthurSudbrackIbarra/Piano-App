import styles from "./WhiteKey.module.css";
import { playNote } from "../../utils/audioHandler";

type WhiteKeyProps = {
  children?: React.ReactNode; // Black Key Children.
  note: string;
  mappedKey?: string;
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
        <div className={styles.noteInfo}>
          <span className={styles.mappedKey}>{props.mappedKey}</span>
          <span className={styles.noteName}>{props.note}</span>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default WhiteKey;
