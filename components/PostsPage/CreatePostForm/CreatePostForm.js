import { useState } from "react";
import styles from "./createPostForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Input from "../../Input/Input";
import BackDrop from "../../BackDrop/BackDrop";
import Button from "../../Button/Button";

const CreatePostForm = (props) => {
  const [inputVals, setInputVals] = useState({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  });
  const formCls = [styles.form];

  props.show && formCls.push(styles.show);

  const changeInputValHandler = (obj) => {
    const { value, id, isValid } = obj;
    const updatedInput = { ...inputVals[obj.id], value, isValid };
    setInputVals({
      ...inputVals,
      [id]: updatedInput,
    });
  };

  const createPostHandler = async (e) => {
    const data = {
      title: inputVals.title.value,
      description: inputVals.description.value,
      username: "Fictitious Name",
    };
    e.preventDefault();
    const resp = await fetch(`http://localhost:3000/api/posts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newUser = await resp.json();
    console.log(newUser);
  };

  return (
    <>
      <BackDrop clicked={props.hideCreateForm} showBackDrop={props.show} />
      <form onSubmit={createPostHandler} className={formCls.join(" ")}>
        <div className={styles.form__header}>
          <h3>Create Post</h3>
          <FontAwesomeIcon
            onClick={props.hideCreateForm}
            icon={faTimes}
          ></FontAwesomeIcon>
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <Input
              inputType="input"
              className={styles.input}
              type="text"
              label="Title"
              changeInputVal={(obj) => changeInputValHandler(obj)}
              id="title"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              inputType="textarea"
              type=""
              label="Description"
              changeInputVal={(obj) => changeInputValHandler(obj)}
              id="description"
            />
          </div>
          <Button className={styles.form__btn}>POST</Button>
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
