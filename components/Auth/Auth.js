import { useState, useContext } from "react";
import styles from "./Auth.module.css";

import Input from "../Input/Input";
import Button from "../Button/Button";
import { MyContext } from "../../context/authContext";
import useCheckAllValid from "../customHooks/useCheckAllValid";

const Auth = (props) => {
  const context = useContext(MyContext);

  const [authMode, setAuthMode] = useState("login");
  const [inputVals, setInputVals] = useState({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const [isAllValid] = useCheckAllValid(inputVals, authMode);

  const changeInputValHandler = (obj) => {
    const { id, value, isValid } = obj;
    const updatedInput = { ...inputVals[id], value, isValid };
    setInputVals({ ...inputVals, [id]: updatedInput });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let authResult;
    if (authMode === "login") {
      const data = {
        email: inputVals.email.value,
        password: inputVals.password.value,
      };

      const resp = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      authResult = await resp.json();
    } else if (authMode === "register") {
      const data = {
        username: inputVals.username.value,
        email: inputVals.email.value,
        password: inputVals.password.value,
      };
      const resp = await fetch(`http://localhost:3000/api/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      authResult = await resp.json();
    }
    context.login(authResult);
  };

  const changeModeHandler = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  return (
    <div className={styles.auth}>
      <h2 className={styles.header}>Log In</h2>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        {authMode === "register" && (
          <Input
            changeInputVal={changeInputValHandler}
            inputType="input"
            type="username"
            label="Username"
            id="username"
            errorMsg="Invalid Username"
            mode={authMode}
            rules={{ type: "MIN_LENGTH", minLength: 5 }}
          />
        )}

        <Input
          changeInputVal={changeInputValHandler}
          inputType="input"
          type="email"
          label="Email"
          mode={authMode}
          id="email"
          errorMsg="Invalid Email"
        />
        <Input
          changeInputVal={changeInputValHandler}
          inputType="input"
          type="password"
          label="Password"
          mode={authMode}
          id="password"
          errorMsg="Invalid Password"
          rules={{ type: "MIN_LENGTH", minLength: 5 }}
        />
        <Button disabled={!isAllValid} className={styles.loginBtn}>
          Submit
        </Button>
        <Button
          clicked={changeModeHandler}
          className={styles.registerBtn}
          btnType="button"
          mode={authMode}
          type="primary"
        >
          {authMode === "login" ? "Register" : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
