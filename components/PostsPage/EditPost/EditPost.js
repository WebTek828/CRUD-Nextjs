import { useState } from "react";
import styles from "../CreatePostForm/createPostForm.module.css";
import inputStyles from "../../Input/input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import BackDrop from "../../BackDrop/BackDrop";
import Button from "../../Button/Button";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const EditPostForm = (props) => {
  const { title, description } = props.post;
  const [isLoading, setIsLoading] = useState(false);

  const [inputVals, setInputVals] = useState({
    title: {
      value: title || "",
      isValid: true,
    },
    description: {
      value: description || "",
      isValid: false,
    },
  });

  const formCls = [styles.form];

  props.show && formCls.push(styles.show);

  const changeInputValHandler = (e, id) => {
    const cloned = { ...inputVals[id], value: e.target.value };
    setInputVals({ ...inputVals, [id]: cloned });
  };

  const editPostHandler = async (e) => {
    e.preventDefault();
    props.hideCreateForm();
    //send http request
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <BackDrop clicked={props.hideCreateForm} showBackDrop={props.show} />
      <form onSubmit={editPostHandler} className={formCls.join(" ")}>
        <div className={styles.form__header}>
          <h3>Create Post</h3>
          <FontAwesomeIcon
            onClick={props.hideCreateForm}
            icon={faTimes}
          ></FontAwesomeIcon>
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <div className={inputStyles.inputContainer}>
              <label>Title</label>
              <input
                onChange={(e) => changeInputValHandler(e, "title")}
                className={inputStyles.input}
                type="text"
                value={inputVals.title.value}
              />
            </div>
            <div className={inputStyles.inputContainer}>
              <label>Description</label>
              <textarea
                rows="10"
                cols="25"
                value={inputVals.description.value}
                onChange={(e) => changeInputValHandler(e, "description")}
                className={inputStyles.input}
                type="text"
              ></textarea>
            </div>
          </div>
          <div className={styles.inputContainer}></div>
          <Button className={styles.form__btn}>POST</Button>
        </div>
      </form>
    </>
  );
};

export default EditPostForm;
