import styles from "./modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.modal}>
      <h3>{props.header}</h3>
      <div>{props.body}</div>
    </div>
  );
};

export default Modal;
