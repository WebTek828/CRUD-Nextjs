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
    const { token, username, email, userId } = userInfo;
    if (token && username && email && userId) {
      setCurUser({
        token,
        user: {
          username,
          email,
          userId,
        },
      });
      router.push("/posts");
    }
  };

  console.log(curUser);

  return (
    <MyContext.Provider
      value={{ curUser, login: (userInfo) => loginHandler(userInfo) }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Provider;
