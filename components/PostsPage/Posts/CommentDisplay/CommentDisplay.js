import styles from "../LikeDisplay/likeDisplay.module.css";
const CommentsDisplay = (props) => {
  const { post } = props;
  return (
    <span className={styles.postComments}>{post.comments.length} Comments</span>
  );
};

export default CommentsDisplay;
