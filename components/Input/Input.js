import { useReducer, useEffect, useContext } from "react";
import { MyContext } from "../../context/authContext";

import styles from "./input.module.css";

const checkValidity = (val, rules) => {
  const context = useContext(MyContext);
  let isValid;
  if (!rules) {
    isValid = true;
  } else {
    if (rules.type === "MIN_LENGTH") {
      isValid = val.length >= rules.minLength;
    }
  }
  console.log(isValid);
  return isValid;
};

const initialState = {
  value: "",
  isValid: false,
  outFocus: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.changeVal,
        isValid: checkValidity(action.changeVal, action.rules),
      };
    case "CLEAR_INPUT_VAL":
      return { ...state, value: "", isValid: false, outFocus: false };
    case "OUT_FOCUS":
      return {
        ...state,
        outFocus: true,
      };
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
        onBlur={() => dispatch({ type: "OUT_FOCUS" })}
        onChange={(e) => {
          dispatch({
            type: "CHANGE",
            changeVal: e.target.valuem,
            rules: props.rules,
          });
        }}
        className={props.className + " " + styles.input}
        value={inputState.value}
        rows="5"
      ></textarea>
    );
  } else {
    input = (
      <input
        onBlur={() => dispatch({ type: "OUT_FOCUS" })}
        onChange={(e) => {
          dispatch({
            type: "CHANGE",
            changeVal: e.target.value,
            rules: props.rules,
          });
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
      {!inputState.isValid && inputState.outFocus && (
        <p className={styles.errorMsg}>{props.errorMsg}</p>
      )}
    </div>
  );
};

export default Input;
