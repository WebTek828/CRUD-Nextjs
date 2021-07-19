import styles from "./createPostForm.module.css";

import Input from "../../Input/Input";
import BackDrop from "../../BackDrop/BackDrop";

const CreatePostForm = (props) => {
  const formCls = [styles.form];

  props.show && formCls.push(styles.show);

  return (
    <>
      <BackDrop clicked={props.hideCreateForm} showBackDrop={props.show} />
      <form className={formCls.join(" ")}>
        <div className={styles.inputContainer}>
          <Input
            inputType="input"
            className={styles.input}
            type="text"
            label="Title"
          />
        </div>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            inputType="textarea"
            type=""
            label="Description"
          />
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
