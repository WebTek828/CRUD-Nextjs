import { useState, useContext } from "react";
import styles from "./createPostForm.module.css";
import { MyContext } from "../../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Input from "../../Input/Input";
import BackDrop from "../../BackDrop/BackDrop";
import Button from "../../Button/Button";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const CreatePostForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
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
    props.hideCreateForm();
    setIsLoading(true);
    const data = {
      title: inputVals.title.value,
      description: inputVals.description.value,
      creator: {
        username: context.curUser.user.username,
        userId: context.curUser.user.userId,
      },
      token: context.curUser.token,
    };
    e.preventDefault();
    const resp = await fetch(`http://localhost:3000/api/posts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newPost = await resp.json();
    props.addNewPost(newPost);
    setIsLoading(false);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
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
              rules={{ type: "MIN_LENGTH", minLength: 1 }}
              errorMsg="This field can't be empty"
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              inputType="textarea"
              label="Description"
              changeInputVal={(obj) => changeInputValHandler(obj)}
              id="description"
              rules={{ type: "MIN_LENGTH", minLength: 1 }}
              errorMsg="This field can't be empty"
            />
          </div>
          <Button className={styles.form__btn}>POST</Button>
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
