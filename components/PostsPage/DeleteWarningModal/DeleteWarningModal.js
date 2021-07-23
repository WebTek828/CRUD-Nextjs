import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";

const DeleteWarningModal = (props) => {
  return (
    <Modal
      header="This action can't be undone."
      body={
        <>
          <p>
            When a post is deleted, you will lose all likes and comments. Are
            you sure you want to delete this?
          </p>
          <Button>Delete</Button>
          <Button type="primary">Cancel</Button>
        </>
      }
    />
  );
};

export default DeleteWarningModal;
