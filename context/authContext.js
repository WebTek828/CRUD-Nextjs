import { useState, createContext } from "react";
import { useRouter } from "next/router";

export const MyContext = createContext();

function Provider(props) {
  const router = useRouter();
  const [curUser, setCurUser] = useState({
    token: null,
    user: { username: null, email: null, userId: null },
  });

  const loginHandler = (userInfo) => {
    if (Object.keys(userInfo).length > 0) {
      setCurUser(userInfo);
      router.push("/posts");
    }
  };

  const updateFollowingHandler = (userFollowing) => {
    console.log(userFollowing);
    const updatedUser = { ...curUser, following: userFollowing };
    setCurUser(updatedUser);
  };
  return (
    <MyContext.Provider
      value={{
        curUser,
        login: (userInfo) => loginHandler(userInfo),
        updateFollowing: updateFollowingHandler,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Provider;
