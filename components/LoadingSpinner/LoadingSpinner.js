import styles from "./loadingSpinner.module.css";
const LoadingSpinner = (props) => {
  const { isLoading } = props;
  return isLoading ? (
    <div className={styles.spinner}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default LoadingSpinner;
