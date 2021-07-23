import styles from "./deleteWarning.module.css";
import { useRouter } from "next/router";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import BackDrop from "../../BackDrop/BackDrop";

const DeleteWarningModal = (props) => {
  const router = useRouter();
  const deletePostHandler = async () => {
    const resp = await fetch(
      `http://localhost:3000/api/posts/${props.postId}`,
      {
        method: "DELETE",
      }
    );
    const deletedPost = await resp.json();
    router.replace(router.asPath);
    props.toggleDeleteWarning(undefined, "delete");
  };

  const { showModal } = props;
  return showModal ? (
    <>
      <BackDrop
        clicked={(e) => props.toggleDeleteWarning(e, "delete")}
        showBackDrop="show"
      />
      <Modal
        header="Are you sure you want to delete your post?"
        body={
          <>
            <p className={styles.text}>
              When a post is deleted, you will lose all of likes and comments.
              Are you sure you want to delete this?
            </p>
            <Button clicked={deletePostHandler} className={styles.btn}>
              Delete
            </Button>
            <Button
              clicked={(e) => props.toggleDeleteWarning(e, "delete")}
              className={styles.btn}
              type="primary"
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  ) : null;
};

export default DeleteWarningModal;
