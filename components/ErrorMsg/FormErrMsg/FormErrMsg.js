import styles from "./formErrMsg.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const FormErrMsg = (props) => {
  return (
    <div className={styles.formErr}>
      <p className={styles.errMsg}>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <span>{props.msg}</span>
      </p>
    </div>
  );
};

export default FormErrMsg;
