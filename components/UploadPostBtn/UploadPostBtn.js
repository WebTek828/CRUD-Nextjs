import styles from "./uploadPostBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import Button from "../Button/Button";

const UploadPostBtn = (props) => {
  return (
    <Button clicked={props.createPost} className={styles.upload} type="primary">
      <FontAwesomeIcon icon={faPencilAlt} /> <span>Upload</span>
    </Button>
  );
};

export default UploadPostBtn;
