import styles from "./uploadPostBtn.module.css";

import Button from "../Button/Button";

const UploadPostBtn = (props) => {
  return (
    <Button clicked={props.createPost} className={styles.upload} type="primary">
      Upload
    </Button>
  );
};

export default UploadPostBtn;
