import styles from "../styles/Navbar.module.css";
import { User } from "../models/user";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";

interface NavbarProps {
  loggedInUser: User | null; // we are forced to pass a user even if it is null
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const Navbar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles["app-logo"]}>My Notes App</h1>
      <div>
        {loggedInUser ? (
          <NavbarLoggedInView
            user={loggedInUser}
            onLogoutSuccessful={onLogoutSuccessful}
          />
        ) : (
          <NavbarLoggedOutView
            onLoginClicked={onLoginClicked}
            onSignUpClicked={onSignUpClicked}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
