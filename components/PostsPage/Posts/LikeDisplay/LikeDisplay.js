import styles from "./likeDisplay.module.css";

const LikeDisplay = (props) => {
  const { post } = props;
  return <span className={styles.postLikes}>{post.likes.length} Likes</span>;
};

export default LikeDisplay;
