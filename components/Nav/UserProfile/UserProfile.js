import styles from "./UserProfile.module.css";

const UserProfile = (props) => {
  const { curUser } = props;
  const name = curUser.username[0];
  return (
    <div>
      <span className={styles.profile}>{name.toUpperCase()}</span>
    </div>
  );
};

export default UserProfile;
