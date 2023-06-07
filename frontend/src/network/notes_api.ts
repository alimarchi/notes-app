import { ConflictError, UnauthorizedError } from "../errors/httpErrors";
import { Note } from "../models/notes";
import { User } from "../models/user";

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage); // add new to instantiate the created class
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        `Request failed with status: ${response.status} and message: ${errorMessage}`
      );
    }
  }
};

// enpoints for user

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("/api/user", { method: "GET" });

  return response.json();
};

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchData("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

export const logout = async () => {
  await fetchData("/api/user/logout", { method: "POST" });
};

// endpoints for notes

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

export const updateNote = async (
  noteId: string,
  note: NoteInput
): Promise<Note> => {
  const response = await fetchData("/api/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
};

export const deleteNote = async (noteId: string) => {
  await fetchData("/api/notes/" + noteId, { method: "DELETE" });
};
