import styles from "../styles/homePage.module.css";

import Button from "../components/Button/Button";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.homepage}>
        <h1 className={styles.homepage__header}>
          <span className={styles.primaryHeading}>Fantastic Life</span>
          <span className={styles.secondaryHeading}>
            Share Your Greatest Moments With Your Friends
          </span>
        </h1>
        <div className={styles.homepage__btns}>
          <Button type="primary">Join</Button>
          <Button className={styles.homepage__btn}>
            <span>Explore</span>
            <span className={styles.homepage__arrow}>&rarr;</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
