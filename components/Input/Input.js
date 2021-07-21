import { useReducer, useEffect } from "react";

import styles from "./input.module.css";

const initialState = {
  value: "",
  isValid: false,
  outFocus: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.changeVal };
    case "CLEAR_INPUT_VAL":
      return { ...state, value: "", isValid: false };
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { isValid, value } = inputState;

  useEffect(() => {
    dispatch({ type: "CLEAR_INPUT_VAL" });
  }, [props.mode]);

  useEffect(() => {
    props.changeInputVal({ isValid, value, id: props.id });
  }, [value, isValid]);

  let input;
  const { type, label, errorMsg, inputType } = props;
  if (inputType === "textarea") {
    input = (
      <textarea
        onChange={(e) => {
          dispatch({ type: "CHANGE", changeVal: e.target.value });
        }}
        className={props.className + " " + styles.input}
        value={inputState.value}
        rows="5"
      ></textarea>
    );
  } else {
    input = (
      <input
        onChange={(e) => {
          dispatch({ type: "CHANGE", changeVal: e.target.value });
        }}
        className={props.className + " " + styles.input}
        type={type}
        value={inputState.value}
      />
    );
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{label}</label>
      {input}
    </div>
  );
};

export default Input;
