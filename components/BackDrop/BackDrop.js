import styles from "./BackDrop.module.css";

const BackDrop = (props) => {
  const { showBackDrop } = props;
  return (
    <div
      onClick={props.clicked}
      className={showBackDrop ? styles.backdrop : ""}
    ></div>
  );
};

export default BackDrop;
