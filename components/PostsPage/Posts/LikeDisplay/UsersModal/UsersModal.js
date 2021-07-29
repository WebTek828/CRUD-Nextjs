import styles from "./usersModal.module.css";

import FollowUser from "../../../../Users/FollowUser/FollowUser";

const UsersModal = (props) => {
  const { users } = props;
  const userOutput =
    users &&
    users.length > 0 &&
    users.map((user) => {
      console.log(user);
      return (
        <div className={styles.modalContent}>
          <div className={styles.userInfo}>
            <img src="https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym95fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <div>
              <h4 className={styles.username}>{user.username}</h4>
              <span>3,100 followers</span>
            </div>
          </div>
          <FollowUser followUser={user._id} />
        </div>
      );
    });
  return <div className={styles.usersModal}>{userOutput}</div>;
};
export default UsersModal;
