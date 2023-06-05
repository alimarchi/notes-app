import styles from "../styles/AddNoteDialog.module.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Note } from "../models/notes";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddNoteDialogProps {
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  const onSubmit = async (input: NoteInput) => {
    try {
      const noteResponse = await NotesApi.createNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles["modal-dialog"]}>
        <div className={styles["modal-header"]}>
          <h2>Add Note</h2>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onDismiss}
            size="xl"
            className={styles.close}
          />
        </div>
        <div className={styles["modal-body"]}>
          <form id="addNoteForm" className={styles["add-note-form"]} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Title" {...register("title", { required: "Required"})} />
            <label>Text</label>
            <textarea placeholder="Text" {...register("text")}></textarea>
          </form>
        </div>
        <div className={styles["modal-footer"]}>
          <button
            type="submit"
            form="addNoteForm"
            className={styles["add-note-button"]}
            disabled={isSubmitting}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteDialog;
