import styles from "./deleteWarning.module.css";
import { useRouter } from "next/router";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";
import BackDrop from "../../BackDrop/BackDrop";

const DeleteWarningModal = (props) => {
  const router = useRouter();

  const deletePostHandler = async () => {
    props.toggleDeleteWarning();
    props.setIsLoading(true);
    const resp = await fetch(
      `http://localhost:3000/api/posts/${props.postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${props.curUser.token}`,
        },
      }
    );
    router.replace(router.asPath);
    props.setIsLoading(false);
  };

  const { showModal } = props;
  return showModal ? (
    <>
      <BackDrop clicked={props.toggleDeleteWarning} showBackDrop="show" />
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
              clicked={props.toggleDeleteWarning}
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
