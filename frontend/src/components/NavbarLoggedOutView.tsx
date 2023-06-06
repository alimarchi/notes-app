import styles from "../styles/Navbar.module.css";

interface NavbarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavbarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavbarLoggedOutViewProps) => {
  return (
    <div className={styles["login-signup-buttons-container"]}>
      <button
        onClick={onSignUpClicked}
        className={styles["login-signup-button"]}
      >
        Sign Up
      </button>
      <button
        onClick={onLoginClicked}
        className={styles["login-signup-button"]}
      >
        Log In
      </button>
    </div>
  );
};

export default NavbarLoggedOutView;
