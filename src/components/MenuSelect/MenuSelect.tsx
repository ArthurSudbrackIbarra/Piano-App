import React from "react";
import { useEffect } from "react";
import { setGlobalInstrument } from "../../utils/globals";
import styles from "./MenuSelect.module.css";

type MenuSelectProps = {
  options: string[];
  inputId: string;
  datalistId: string;
  initialValue: string;
  onChange: (value: string) => void;
};

function MenuSelect(props: MenuSelectProps) {
  const inputRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    const input = document.getElementById(props.inputId) as HTMLInputElement;
    if (input) {
      input.value = props.initialValue;
    }
  });
  return (
    <>
      <datalist id={props.datalistId}>
        {props.options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
      <input
        ref={inputRef}
        id={props.inputId}
        list={props.datalistId}
        className={styles.select}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.select();
          }
        }}
      ></input>
    </>
  );
}

export default MenuSelect;
