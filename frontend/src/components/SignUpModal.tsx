import { useState } from "react";
import styles from "../styles/modals.module.css";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ConflictError } from "../errors/httpErrors";

interface SignUpModalProps {
  onDismiss: () => void; // function to dismiss the modal
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  const isBlank = (value: string) => {
    return value.trim() === ""; // Check if the value contains only blank spaces
  };

  const onSubmit = async (credentials: SignUpCredentials) => {
    try {
      const newUser = await NotesApi.signUp(credentials); // Call the signUp API with the provided credentials
      onSignUpSuccessful(newUser); // Call the onSignUpSuccessful function with the newly created user
    } catch (error) {
      if (error instanceof ConflictError) {
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
          <h2>Sign Up</h2>
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
            id="signupForm"
            className={styles["add-note-form"]}
            onSubmit={handleSubmit(onSubmit)} // Call the onSubmit function when the form is submitted
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
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Username must be maximum 10 characters",
                },
              })} // Register the "username" input field with react-hook-form and provide validation rules
            />
            {errors.username && (
              <p className={styles["error-message"]}>
                {errors.username.message}
              </p>
            )}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`${
                errors.email ? styles["input-alert"] : styles["input-border"]
              }`}
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className={styles["error-message"]}>{errors.email.message}</p>
            )}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`${
                errors.password ? styles["input-alert"] : styles["input-border"]
              }`}
              {...register("password", {
                required: "Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
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
            form="signupForm"
            className={styles["signup-button"]}
            disabled={isSubmitting} // Disable the button if the form is being submitted
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
