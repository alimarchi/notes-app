import { Note as NoteModel } from "../models/notes";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  // this will be executed at every render, but it's a cheap operation
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <div className={styles["note-card"]}>
      <div className={styles["note-body"]}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className={styles["note-footer"]}>{createdUpdatedText}</div>
    </div>
  );
};

export default Note;
