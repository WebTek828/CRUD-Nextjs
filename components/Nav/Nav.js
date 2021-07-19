import Link from "next/link";
import styles from "./nav.module.css";

const Nav = (props) => {
  return (
    <nav className={styles.nav}>
      <h1>Logo</h1>
      <ul className={styles.nav__lists}>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/posts">
          <li>Posts</li>
        </Link>
        <Link href="/login">
          <li>Login</li>
        </Link>
        <Link href="/login">
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
