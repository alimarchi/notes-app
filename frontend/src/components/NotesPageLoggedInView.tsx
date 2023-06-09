import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Note from "../components/Note";
import { Note as NoteModel } from "../models/notes";
import * as NotesApi from "../network/notes_api";
import AddEditNoteDialog from "./AddNoteDialog";
import Loader from "./Loader";
import styles from "../styles/NotesPagedLoggedIn.module.css";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [notesLoading, setNotesLoading] = useState(true); // loading state of notes
  const [showNotesLoadingError, setshowNotesLoadingError] = useState(false); 

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false); // visibility of the add note dialog

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null); 

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setshowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes(); // fetch the notes
        setNotes(notes);
      } catch (error) {
        console.log(error);
        setshowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id)); // update UI
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const showNotes = (
    <div className={styles["notes-container"]}>
      {notes.map((note) => (
        <Note
          note={note}
          key={note._id}
          onDeleteNoteClicked={deleteNote}
          onNoteClicked={setNoteToEdit}
        />
      ))}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setshowAddNoteDialog(true)}
        className={styles["add-button"]}
      >
        <FontAwesomeIcon icon={faPlus} /> Add New Note
      </button>
      {notesLoading && <Loader />}
      {showNotesLoadingError && (
        <p className={styles["warn-message"]}>
          Something went wrong. Please reload the page.
        </p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            showNotes
          ) : (
            <p className={styles["warn-message"]}>
              You don't have any notes yet
            </p>
          )}
        </>
      )}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setshowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setshowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
