import styles from "../styles/modals.module.css";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UnauthorizedError } from "../errors/httpErrors";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const isBlank = (value: string) => {
    return value.trim() === ""; // Check if the value contains only blank spaces
  };

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
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
          {errorText && <p className={styles["error-alert"]}>{errorText}</p>}
          <form
            id="loginForm"
            className={styles["add-note-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              className={`${
                errors.username ? styles["input-alert"] : styles["input-border"]
              }`}
              {...register("username", {
                required: "Username is required",
                validate: (value) =>
                  !isBlank(value) || "Username cannot be blank spaces",
              })}
            />
            {errors.username && (
              <p className={styles["error-message"]}>
                {errors.username.message}
              </p>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`${
                errors.password ? styles["input-alert"] : styles["input-border"]
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className={styles["error-message"]}>
                {errors.password.message}
              </p>
            )}
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
