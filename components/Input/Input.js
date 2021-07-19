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
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);
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
