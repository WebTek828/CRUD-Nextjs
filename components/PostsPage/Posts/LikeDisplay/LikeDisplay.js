import styles from "./likeDisplay.module.css";

const LikeDisplay = (props) => {
  const { post } = props;

  const displayLikeUserHandler = async () => {
    console.log("Display like.");
    const resp = await fetch(
      `http://localhost:3000/api/posts/${post._id}/like`
    );
    const json = await resp.json();
    console.log(json);
  };

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
