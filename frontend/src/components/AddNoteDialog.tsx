import styles from "../styles/AddNoteDialog.module.css";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Note } from "../models/notes";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
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
          <h2>{noteToEdit? "Edit Note" : "Add Note"}</h2>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onDismiss}
            size="xl"
            className={styles.close}
          />
        </div>
        <div className={styles["modal-body"]}>
          <form
            id="addEditNoteForm"
            className={styles["add-note-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: "Required" })}
            />
            <label>Text</label>
            <textarea placeholder="Text" {...register("text")}></textarea>
          </form>
        </div>
        <div className={styles["modal-footer"]}>
          <button
            type="submit"
            form="addEditNoteForm"
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

export default AddEditNoteDialog;
