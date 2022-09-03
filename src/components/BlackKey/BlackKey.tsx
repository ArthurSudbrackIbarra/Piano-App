import { playNote } from "../../utils/audioHandler";
import styles from "./BlackKey.module.css";

type BlackKeyProps = {
  note: string;
  mappedKey?: string;
};

function BlackKey(props: BlackKeyProps) {
  return (
    <div
      className={`${styles.key} blackKey`}
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
  );
}

export default BlackKey;
