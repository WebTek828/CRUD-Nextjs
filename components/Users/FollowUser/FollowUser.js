import { useContext } from "react";
import { useRouter } from "next/router";

import styles from "./followUser.module.css";

import { MyContext } from "../../../context/authContext";

const FollowUsers = (props) => {
  const router = useRouter();
  const context = useContext(MyContext);
  const curUserId = context.curUser.userId;
  let curUserFollower;
  if (curUserId) {
    curUserFollower = context.curUser.following.find(
      (id) => id === props.followUser
    );
  }

  const followBtnStyle = [styles.follow];
  curUserFollower && followBtnStyle.push(styles.follower);

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
    const json = await resp.json();
    context.updateFollowing(json);
  };

  return curUserId !== props.followUser ? (
    <span onClick={followUserHandler} className={followBtnStyle.join(" ")}>
      {curUserFollower ? "Unfollow" : "Follow"}
    </span>
  ) : null;
};

export default FollowUsers;
