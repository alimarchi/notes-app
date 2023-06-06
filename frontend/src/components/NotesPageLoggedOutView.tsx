import styles from "../styles/NotesPageLoggedOut.module.css";

const NotesPageLoggedOutView = () => {
  return (
    <div className={styles["note-homepage-container"]}>
      <div className={styles["note-homepage"]}>
      Welcome to <strong>My Notes App</strong>! Sign up or log in to your
      account and let the note-taking begin! Capture your thoughts, ideas, and
      important information.
    </div>
    </div>
    
  );
};

export default NotesPageLoggedOutView;
