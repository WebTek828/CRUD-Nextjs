import { useContext } from "react";
import { useRouter } from "next/router";

import styles from "./followUser.module.css";

import { MyContext } from "../../../context/authContext";

const FollowUsers = (props) => {
  const router = useRouter();
  const context = useContext(MyContext);
  const curUserId = context.curUser.userId;
  console.log(curUserId);
  console.log(props);

  const followUserHandler = async () => {
    if (!curUserId) {
      router.push("/login");
      return;
    }

    const data = {
      followerUserId: curUserId,
      userId: props.followUser,
    };

    const resp = await fetch(`http://localhost:3000/api/follow`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = resp.json();
    console.log(json);
  };

  return (
    <span onClick={followUserHandler} className={styles.follow}>
      Follow
    </span>
  );
};

export default FollowUsers;
