import { useState, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/posts.module.css";
import moment from "moment";
import { MyContext } from "../../context/authContext";

import UpdatePostUI from "../../components/PostsPage/UpdatePostUI/UpdatePostUI";
import UploadPostBtn from "../../components/UploadPostBtn/UploadPostBtn";
import CreatePostForm from "../../components/PostsPage/CreatePostForm/CreatePostForm";
import DeleteWarningModal from "../../components/PostsPage/DeleteWarningModal/DeleteWarningModal";

const Posts = ({ posts }) => {
  const context = useContext(MyContext);
  const { curUser } = context;
  const router = useRouter();
  const [createPost, setCreatePost] = useState(false);
  const [reRender, setRerender] = useState(false);

  const createPostHandler = () => {
    setCreatePost(true);
  };

  const hideCreateFormHandler = () => {
    setCreatePost(false);
  };

  const addNewPostHandler = () => {
    router.replace(router.asPath);
  };

  const toggleUpdateOptionsHandler = (e, type, postId) => {
    const post = posts.find((post) => postId === post._id);
    if (type && !e.target.closest("#update-post")) {
      posts.forEach((post) => (post.isEditing = false));
      setRerender(!reRender);
      return;
    } else if (post) {
      post.isEditing = true;
      setRerender(!reRender);
    }
  };

  const postsOutput =
    posts &&
    posts.length > 0 &&
    posts.map((post) => {
      return (
        <div key={post._id}>
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
              postCreatorId={post.creator.userId}
              curUser={curUser}
              isEditing={post.isEditing}
              showUpdateOptions={(e) =>
                toggleUpdateOptionsHandler(e, undefined, post._id)
              }
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
              <p className={styles.descr}>{post.description}</p>
              <span className={styles.postedTime}>
                {moment(post.createdAt).fromNow()}
              </span>
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
        </div>
      );
    });
  return (
    <>
      <CreatePostForm
        addNewPost={(post) => addNewPostHandler(post)}
        hideCreateForm={hideCreateFormHandler}
        show={createPost}
      />
      <DeleteWarningModal />
      <div
        onClick={(e) => toggleUpdateOptionsHandler(e, "hide")}
        className={styles.postsPage}
      >
        <UploadPostBtn createPost={createPostHandler} />
        <h3>User Posts</h3>
        <div className={styles.posts}>{postsOutput}</div>
      </div>
    </>
  );
};

export default Posts;

export const getServerSideProps = async (context) => {
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
