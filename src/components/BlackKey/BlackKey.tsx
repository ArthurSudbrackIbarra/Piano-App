import { playNote } from "../../utils/audioHandler";
import styles from "./BlackKey.module.css";

type BlackKeyProps = {
  note: string;
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
      <span className={styles.noteName}>{props.note}</span>
    </div>
  );
}

export default BlackKey;
