import styles from "./button.module.css";
const Button = (props) => {
  const btnCls = [styles.btn];
  props.type === "primary"
    ? btnCls.push(styles.primaryBtn)
    : btnCls.push(styles.secondaryBtn);
  return (
    <button
      onClick={props.clicked}
      style={props.style}
      className={btnCls.join(" ") + " " + props.className}
    >
      {props.children}
    </button>
  );
};

export default Button;
