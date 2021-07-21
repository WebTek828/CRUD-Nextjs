import { useState } from "react";
import styles from "./Auth.module.css";

import Input from "../Input/Input";
import Button from "../Button/Button";

const Auth = (props) => {
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

  const changeInputValHandler = (obj) => {
    const { id, value, isValid } = obj;
    const updatedInput = { ...inputVals[id], value, isValid };
    setInputVals({ ...inputVals, [id]: updatedInput });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
      const result = await resp.json();
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
      const result = await resp.json();
    }
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
            mode={authMode}
          />
        )}

        <Input
          changeInputVal={changeInputValHandler}
          inputType="input"
          type="email"
          label="Email"
          mode={authMode}
          id="email"
        />
        <Input
          changeInputVal={changeInputValHandler}
          inputType="input"
          type="password"
          label="Password"
          mode={authMode}
          id="password"
        />
        <Button className={styles.loginBtn}>Submit</Button>
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
