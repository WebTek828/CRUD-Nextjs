import styles from "./updatePostUI.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFlag } from "@fortawesome/free-solid-svg-icons";

const UpdatePostUI = (props) => {
  const editPostHandler = () => {
    console.log("Edit this post.");
  };

  const showDeleteWarningHandler = () => {
    console.log("Show delete warning.");
  };

  const { curUser, postCreatorId } = props;
  const postOwner = curUser.user.userId === postCreatorId;
  return curUser.token ? (
    <div
      onClick={props.showUpdateOptions}
      id="update-post"
      className={styles.dots}
    >
      <span className={styles.dot}></span>
      {props.isEditing && (
        <div className={styles.update}>
          <ul>
            {postOwner && (
              <li onClick={editPostHandler} className={styles.updateList}>
                <FontAwesomeIcon icon={faEdit} />
                <span>Edit</span>
              </li>
            )}
            {postOwner && (
              <li
                onClick={showDeleteWarningHandler}
                className={styles.updateList}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                <span>Delete</span>
              </li>
            )}
            {!postOwner && (
              <li className={styles.updateList}>
                <FontAwesomeIcon icon={faFlag} />
                <span>Report</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  ) : null;
};

export default UpdatePostUI;
