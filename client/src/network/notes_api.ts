import { Note } from '../models/note';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = (await response.json()) as { error: string };
    console.log(errorBody);
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData('/api/notes', {
    method: 'GET',
  });
  return response.json() as Promise<Note[]>;
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json() as Promise<Note>;
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  return response.json() as Promise<Note>;
}

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, { method: 'DELETE' });
}
