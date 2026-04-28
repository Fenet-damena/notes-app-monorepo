import axios from "axios";
import type { Note, NoteCategoryValue } from "./types";

type ApiNote = {
  id: number;
  title: string;
  content: string;
  category: NoteCategoryValue;
  created_at: string;
};

type CreateNotePayload = {
  title: string;
  description: string;
  category: NoteCategoryValue;
};

type UpdateNotePayload = CreateNotePayload;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

function mapApiNote(note: ApiNote): Note {
  return {
    id: note.id,
    title: note.title,
    description: note.content,
    category: note.category,
    createdAt: note.created_at
  };
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await apiClient.get<ApiNote[]>("/notes/");
  return response.data.map(mapApiNote);
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await apiClient.post<ApiNote>("/notes/", {
    title: payload.title,
    content: payload.description,
    category: payload.category
  });

  return mapApiNote(response.data);
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await apiClient.get<ApiNote>(`/notes/${id}/`);
  return mapApiNote(response.data);
}

export async function updateNote(id: number, payload: UpdateNotePayload): Promise<Note> {
  const response = await apiClient.put<ApiNote>(`/notes/${id}/`, {
    title: payload.title,
    content: payload.description,
    category: payload.category
  });

  return mapApiNote(response.data);
}

export async function deleteNote(id: number): Promise<void> {
  await apiClient.delete(`/notes/${id}/`);
}
