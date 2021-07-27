import styles from "./postLike.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const PostLike = (props) => {
  const postLikeStyle = [styles.likeContainer];
  const router = useRouter();
  const { curUser, post } = props;
  const isAuthenticated = !!curUser.token;
  let likedPost;
  if (isAuthenticated) {
    likedPost = post.likes.some(
      (uid) => uid === curUser.user.userId.toString()
    );
    likedPost && postLikeStyle.push(styles.liked);
  }

  const postLikeHandler = async () => {
    const data = {
      userId: curUser.user.userId,
      postId: post._id,
    };
    if (!curUser.token) {
      router.push("/login");
      return;
    }
    const resp = await fetch(`http://localhost:3000/api/like`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    router.replace(router.asPath);
  };

  return (
    <div onClick={postLikeHandler} className={postLikeStyle.join(" ")}>
      <FontAwesomeIcon icon={faThumbsUp} />
      <span className={styles.like}>{likedPost ? "unlike" : "like"}</span>
    </div>
  );
};

export default PostLike;
