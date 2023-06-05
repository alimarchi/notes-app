import { Note } from "../models/notes";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
};

export const fetchNotes = async (): Promise<Note[]> => {
  // the function returns a promise of an array of Note objects
  const response = await fetchData("/api/notes", { method: "GET" });

  return response.json();
};

export interface NoteInput {
  title: string;
  text?: string;
}

export const createNote = async (note: NoteInput): Promise<Note> => {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
};