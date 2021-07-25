import { useState, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/posts.module.css";

import { MyContext } from "../../context/authContext";

import UploadPostBtn from "../../components/UploadPostBtn/UploadPostBtn";
import CreatePostForm from "../../components/PostsPage/CreatePostForm/CreatePostForm";
import DeleteWarningModal from "../../components/PostsPage/DeleteWarningModal/DeleteWarningModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Posts from "../../components/PostsPage/Posts/Posts";
import EditPost from "../../components/PostsPage/EditPost/EditPost";

const PostsPage = ({ posts }) => {
  const context = useContext(MyContext);
  const { curUser } = context;
  const router = useRouter();
  const [createPost, setCreatePost] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const hideUpdateOptions = () => {
    posts.forEach((post) => (post.isEditing = false));
    setRerender(!reRender);
  };

  const createPostHandler = () => {
    curUser.token ? setCreatePost(true) : router.push("/login");
  };

  const hideCreateFormHandler = () => {
    setCreatePost(false);
    setShowEditForm(false);
  };

  const addNewPostHandler = () => {
    router.replace(router.asPath);
  };

  const hideUpdateOptionsHandler = (e) => {
    !e.target.closest("#update-post") && hideUpdateOptions();
  };

  const setLoadingHandler = (boolean) => {
    setIsLoading(boolean);
  };

  const showUpdateOptionsHandler = (e, postId) => {
    const post = posts.find((post) => postId === post._id);
    if (post && !e.target.closest("#update-options")) {
      post.isEditing = true;
      setRerender(!reRender);
    }
  };

  const toggleDeleteWarningHandler = (e, postId) => {
    postId ? setShowDeleteWarning(postId) : setShowDeleteWarning(null);
    hideUpdateOptions();
  };

  const showEditFormHandler = (post) => {
    setShowEditForm(post);
    hideUpdateOptions();
  };

  return (
    <>
      {showEditForm && (
        <EditPost
          setIsLoading={setLoadingHandler}
          addNewPost={(post) => addNewPostHandler(post)}
          hideCreateForm={hideCreateFormHandler}
          show={showEditForm}
          post={showEditForm}
        />
      )}
      <DeleteWarningModal
        setIsLoading={setLoadingHandler}
        showModal={showDeleteWarning}
        showDeleteWarning={toggleDeleteWarningHandler}
        toggleDeleteWarning={toggleDeleteWarningHandler}
        postId={showDeleteWarning}
      />
      <LoadingSpinner isLoading={isLoading} />
      <CreatePostForm
        addNewPost={(post) => addNewPostHandler(post)}
        hideCreateForm={hideCreateFormHandler}
        show={createPost}
      />
      <div onClick={hideUpdateOptionsHandler} className={styles.postsPage}>
        <UploadPostBtn createPost={createPostHandler} />
        <h3>User Posts</h3>
        <div className={styles.posts}>
          <Posts
            showUpdateOptions={showUpdateOptionsHandler}
            curUser={curUser}
            posts={posts}
            toggleDeleteWarning={toggleDeleteWarningHandler}
            showEditForm={showEditFormHandler}
          />
        </div>
      </div>
    </>
  );
};

export default PostsPage;

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
