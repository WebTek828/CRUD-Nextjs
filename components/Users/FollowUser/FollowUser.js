import { useContext } from "react";
import { useRouter } from "next/router";

import styles from "./followUser.module.css";

import { MyContext } from "../../../context/authContext";

const FollowUsers = (props) => {
  const router = useRouter();
  const context = useContext(MyContext);
  const curUserId = context.curUser.user.userId;
  console.log(curUserId);
  console.log(props);
  const followUserHandler = () => {
    if (!curUserId) {
      router.push("/login");
      return;
    }
    console.log("Make http request.");
  };

  return (
    <span onClick={followUserHandler} className={styles.follow}>
      Follow
    </span>
  );
};

export default FollowUsers;
