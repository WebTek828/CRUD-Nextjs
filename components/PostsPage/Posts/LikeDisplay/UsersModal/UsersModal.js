import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import styles from "./usersModal.module.css";
const UsersModal = (props) => {
  const { users } = props;
  console.log(users);
  const userOutput =
    users &&
    users.length > 0 &&
    users.map((user) => {
      return (
        <div className={styles.modalContent}>
          <div className={styles.userInfo}>
            <img src="https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym95fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <div>
              <h4 className={styles.username}>{user.username}</h4>
              <span>3,100 followers</span>
            </div>
          </div>
          <span className={styles.follow + " " + styles.following}>Follow</span>
        </div>
      );
    });
  return <div className={styles.usersModal}>{userOutput}</div>;
};
export default UsersModal;
