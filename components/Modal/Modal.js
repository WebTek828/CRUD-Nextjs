import styles from "./modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.modal}>
      <h3 className={styles.header}>{props.header}</h3>
      <div className={styles.modalBody}>{props.body}</div>
    </div>
  );
};

export default Modal;
