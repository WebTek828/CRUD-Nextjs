import styles from "./button.module.css";
const Button = (props) => {
  const btnCls = [styles.btn];
  props.type === "primary"
    ? btnCls.push(styles.primaryBtn)
    : btnCls.push(styles.secondaryBtn);
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      style={props.style}
      className={btnCls.join(" ") + " " + props.className}
      type={props.btnType}
    >
      {props.children}
    </button>
  );
};

export default Button;
