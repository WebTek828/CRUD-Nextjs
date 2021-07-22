import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/posts.module.css";

import UploadPostBtn from "../../components/UploadPostBtn/UploadPostBtn";
import CreatePostForm from "../../components/PostsPage/CreatePostForm/CreatePostForm";

const Posts = ({ posts }) => {
  const router = useRouter();
  const [createPost, setCreatePost] = useState(false);

  const createPostHandler = () => {
    setCreatePost(true);
  };

  const hideCreateFormHandler = () => {
    setCreatePost(false);
  };

  const addNewPostHandler = (newPost) => {
    router.replace(router.asPath);
  };

  const postsOutput =
    posts &&
    posts.length > 0 &&
    posts.map((post) => {
      return (
        <>
          <div className={styles.post}>
            <div className={styles.imageContainer}>
              <img
                src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
              />
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
        addNewPost={(post) => addNewPostHandler(post)}
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

export const getServerSideProps = async (context) => {
  console.log("Run??");
  const resp = await fetch(`http://localhost:3000/api/posts`, {
    method: "GET",
  });
  const posts = await resp.json();
  return {
    props: {
      posts: posts.allPosts,
    },
  };
};
