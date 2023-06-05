import React, { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };
    loadNotes();
  }, []);

  return (
    <div className="container">
      <button
        onClick={() => setshowAddNoteDialog(true)}
        className={styles["add-button"]}
      >
        Add New Note
      </button>
      <div className={styles["notes-container"]}>
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </div>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setshowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setshowAddNoteDialog(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
