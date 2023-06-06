import styles from "../styles/AddNoteDialog.module.css";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-header"]}>
          <h2>Log In</h2>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onDismiss}
            size="xl"
            className={styles.close}
          />
        </div>
        <div className={styles["modal-body"]}>
          <form
            id="loginForm"
            className={styles["add-note-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Required" })}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Required" })}
            />
          </form>
        </div>
        <div className={styles["modal-footer"]}>
          <button
            type="submit"
            form="loginForm"
            className={styles["signup-button"]}
            disabled={isSubmitting}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
