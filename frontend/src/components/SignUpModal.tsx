import styles from "../styles/AddNoteDialog.module.css";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-header"]}>
          <h2>Sign Up</h2>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onDismiss}
            size="xl"
            className={styles.close}
          />
        </div>
        <div className={styles["modal-body"]}>
          <form
            id="signupForm"
            className={styles["add-note-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Required" })}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Required" })}
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
            form="signupForm"
            className={styles["signup-button"]}
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
