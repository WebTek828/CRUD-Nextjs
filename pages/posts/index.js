import { useState } from "react";

import styles from "../../styles/posts.module.css";

import UploadPostBtn from "../../components/UploadPostBtn/UploadPostBtn";
import CreatePostForm from "../../components/PostsPage/CreatePostForm/CreatePostForm";

const posts = [
  {
    img: "https://images.unsplash.com/photo-1513477967668-2aaf11838bd6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Drinking a cup of coffee",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    date: "3 days ago",
    likes: [1, 2, 3, 4, 5],
    comments: [1, 2, 3, 4, 5],
  },
  {
    img: "https://images.unsplash.com/photo-1513477967668-2aaf11838bd6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Drinking a cup of coffee",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    date: "3 days ago",
    likes: [1, 2, 3, 4, 5],
    comments: [1, 2, 3, 4, 5],
  },
  {
    img: "https://images.unsplash.com/photo-1513477967668-2aaf11838bd6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvc3R8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    title: "Drinking a cup of coffee",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    date: "3 days ago",
    likes: [1, 2, 3, 4, 5],
    comments: [1, 2, 3, 4, 5],
  },
];

const Posts = () => {
  const [createPost, setCreatePost] = useState(false);

  const createPostHandler = () => {
    setCreatePost(true);
  };

  const hideCreateFormHandler = () => {
    setCreatePost(false);
  };

  const postsOutput = posts.map((post) => {
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
