import { useContext } from "react";
import Link from "next/link";
import styles from "./nav.module.css";
import { MyContext } from "../../context/authContext";
import { useRouter } from "next/router";

import UserProfile from "./UserProfile/UserProfile";

const Nav = (props) => {
  const router = useRouter();
  const activeNavLink = (path) =>
    router.pathname === path ? styles.activeNavLink : "";

  const context = useContext(MyContext);
  const { token: isAuthenticated } = context.curUser;

  return (
    <nav className={styles.nav}>
      <h1>Logo</h1>
      <ul className={styles.nav__lists}>
        <Link href="/">
          <li className={activeNavLink("/")}>Home</li>
        </Link>
        <Link href="/posts">
          <li className={activeNavLink("/posts")}>Posts</li>
        </Link>
        {!isAuthenticated && (
          <Link href="/login">
            <li className={activeNavLink("/login")}>Login</li>
          </Link>
        )}
        {!isAuthenticated && (
          <Link href="/login">
            <li className={activeNavLink("/login")}>Register</li>
          </Link>
        )}
        {isAuthenticated && <UserProfile curUser={context.curUser} />}
      </ul>
    </nav>
  );
};

export default Nav;
