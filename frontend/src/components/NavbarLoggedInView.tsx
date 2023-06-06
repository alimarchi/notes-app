import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/Navbar.module.css";

interface NavbarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavbarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavbarLoggedInViewProps) => {
  const logout = async () => {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className={styles["logged-items"]}>
      <h3 className={styles["signed-in"]}>Hello, {user.username}!</h3>
      <button onClick={logout} className={styles["logout-button"]}>Log Out</button>
    </div>
  );
};

export default NavbarLoggedInView;
