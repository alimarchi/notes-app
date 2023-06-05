import { Note as NoteModel } from "../models/notes";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void,
  onDeleteNoteClicked: (note: NoteModel) => void,
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  // this will be executed at every render, but it's a cheap operation
  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <div className={styles["note-card"]} onClick={() => onNoteClicked(note)}>
      <div className={styles["note-body"]}>
        <div className={styles["note-header"]}>
          <h2>{title}</h2>{" "}
          <FontAwesomeIcon
            icon={faTrashCan}
            size="xl"
            className={styles["trash-can"]}
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </div>
        <p>{text}</p>
      </div>
      <div className={styles["note-footer"]}>{createdUpdatedText}</div>
    </div>
  );
};

export default Note;
