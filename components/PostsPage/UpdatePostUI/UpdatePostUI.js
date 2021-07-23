import styles from "./updatePostUI.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UpdatePostUI = (props) => {
  return (
    <div className={styles.dots}>
      <span className={styles.dot}></span>
      <div className={styles.update}>
        <ul>
          <li className={styles.updateList}>
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit</span>
          </li>
          <li className={styles.updateList}>
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Delete</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UpdatePostUI;
