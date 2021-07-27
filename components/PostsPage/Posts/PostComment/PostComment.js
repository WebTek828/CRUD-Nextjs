import styles from "../PostLike/postLike.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
const PostComment = (props) => {
  return (
    <div className={styles.commentContainer}>
      <FontAwesomeIcon icon={faComment} />
      <span className={styles.comment}>Comment</span>
    </div>
  );
};

export default PostComment;
