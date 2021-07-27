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

  const postLikeHandler = () => {
    // if (!curUser.token) {
    //   router.push("/login");
    // }
    console.log(curUser);
    console.log(post);
  };

  return (
    <div onClick={postLikeHandler} className={postLikeStyle.join(" ")}>
      <FontAwesomeIcon icon={faThumbsUp} />
      <span className={styles.like}>{likedPost ? "unlike" : "like"}</span>
    </div>
  );
};

export default PostLike;
