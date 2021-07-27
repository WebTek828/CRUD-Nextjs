import { useState } from "react";
import moment from "moment";
import styles from "./posts.module.css";

import UpdatePostUI from "../UpdatePostUI/UpdatePostUI";
import PostLike from "./PostLike/PostLike";
import PostComment from "./PostComment/PostComment";
import LikeDisplay from "./LikeDisplay/LikeDisplay";
import CommentDisplay from "./CommentDisplay/CommentDisplay";

const Posts = (props) => {
  const [reRender, setRerender] = useState(false);
  const { posts, curUser, showUpdateOptions, toggleDeleteWarning } = props;

  const updatePostLikeHandler = (updatedPost) => {
    const postIndex = posts.findIndex(
      (post) => post._id.toString() === updatedPost._id.toString()
    );
    posts[postIndex] = updatedPost;
    setRerender(!reRender);
  };

  return (
    posts &&
    posts.length > 0 &&
    posts.map((post) => {
      const toggleShrinkHandler = () => {
        post.expandText = post.expandText ? false : true;
      };
      let postDescription = <span>{post.description}</span>;

      if (post.description.length > 100) {
        let text = !post.expandText
          ? post.description.substr(0, 100)
          : post.description;
        postDescription = (
          <div>
            <span>{text}</span>
            <span onClick={toggleShrinkHandler} className={styles.seemore}>
              {post.expandText ? "See Less" : "...See more"}
            </span>
          </div>
        );
      }

      return (
        <div className={styles.postContainer} key={post._id}>
          <div className={styles.updatePostContainer}>
            <div className={styles.creator}>
              <img
                className={styles.creatorImg}
                src="https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym95fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              />
              <div className={styles.creatorInfo}>
                <h2>{post.creator.username}</h2>
                <p className={styles.creatorFollow}>Follow</p>
              </div>
            </div>
            <UpdatePostUI
              toggleDeleteWarning={(e) => toggleDeleteWarning(e, post._id)}
              postCreatorId={post.creator.userId}
              curUser={curUser}
              isEditing={post.isEditing}
              showUpdateOptions={(e) => showUpdateOptions(e, post._id)}
              showEditForm={() => props.showEditForm(post)}
            />
          </div>
          <div className={styles.post}>
            <div className={styles.imageContainer}>
              <img
                src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.header}>{post.title}</h3>
              <p className={styles.descr}>{postDescription}</p>
              <span className={styles.postedTime}>
                {moment(post.createdAt).fromNow()}
              </span>
              <div className={styles.postInfo}>
                <span className={styles.date}>{post.date}</span>
              </div>
            </div>
          </div>
          <div className={styles.likesComsCount}>
            <LikeDisplay post={post} />
            <CommentDisplay post={post} />
          </div>
          <div className={styles.likeComment}>
            <PostLike
              updatePostLike={updatePostLikeHandler}
              curUser={curUser}
              post={post}
            />
            <PostComment curUser={curUser} post={post} />
          </div>
        </div>
      );
    })
  );
};

export default Posts;
