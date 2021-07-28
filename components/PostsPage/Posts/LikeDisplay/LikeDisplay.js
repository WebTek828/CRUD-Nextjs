import styles from "./likeDisplay.module.css";

const LikeDisplay = (props) => {
  console.log(props.post);
  const displayLikeUserHandler = () => {
    console.log("Display like.");
  };

  const { post } = props;
  return (
    <>
      <span onClick={displayLikeUserHandler} className={styles.postLikes}>
        {post.likes.length} Likes
      </span>
      <div></div>
    </>
  );
};

export default LikeDisplay;
