import { useState } from "react";

import styles from "../../styles/posts.module.css";

import UploadPostBtn from "../../components/UploadPostBtn/UploadPostBtn";
import CreatePostForm from "../../components/PostsPage/CreatePostForm/CreatePostForm";

const Posts = ({ posts }) => {
  console.log(posts);
  const [createPost, setCreatePost] = useState(false);

  const createPostHandler = () => {
    setCreatePost(true);
  };

  const hideCreateFormHandler = () => {
    setCreatePost(false);
  };

  const postsOutput =
    posts &&
    posts.length > 0 &&
    posts.map((post) => {
      return (
        <>
          <div className={styles.post}>
            <div className={styles.imageContainer}>
              <img src={post.img} />
            </div>

            <div className={styles.content}>
              <h3 className={styles.header}>{post.title}</h3>
              <p className={styles.descr}>{post.description}</p>
              <div className={styles.postInfo}>
                <div>
                  <span className={styles.postLikes}>
                    {post.likes.length} Likes
                  </span>
                  <span className={styles.postComments}>
                    {post.comments.length} Comments
                  </span>
                </div>

                <span className={styles.date}>{post.date}</span>
              </div>
            </div>
          </div>
        </>
      );
    });
  return (
    <div className={styles.postsPage}>
      <CreatePostForm
        hideCreateForm={hideCreateFormHandler}
        show={createPost}
      />
      <UploadPostBtn createPost={createPostHandler} />
      <h3>User Posts</h3>
      <div className={styles.posts}>{postsOutput}</div>
    </div>
  );
};

export default Posts;

export const getStaticProps = async (context) => {
  const resp = await fetch(`http://localhost:3000/api/posts`);
  const posts = await resp.json();

  return {
    props: {
      posts: posts.allPosts,
    },
  };
};
