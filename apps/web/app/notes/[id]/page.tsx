"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NoteForm from "@/components/forms/NoteForm";
import { fetchNoteById, updateNote } from "@/components/services/api";
import type { NoteCategoryValue } from "@/components/notes/types";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const noteId = Number(params.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<NoteCategoryValue>("Work");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNote() {
      if (Number.isNaN(noteId)) {
        setError("Invalid note id.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const note = await fetchNoteById(noteId);
        setTitle(note.title);
        setDescription(note.description);
        setCategory(note.category);
        setError(null);
      } catch {
        setError("Unable to load this note. Please check the API and try again.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadNote();
  }, [noteId]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-rose-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-500">Edit note</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">Update your note</h1>
          </div>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to notes
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-lg border border-dashed border-rose-200 bg-rose-50/40 p-6 text-sm text-slate-600">
            Loading note...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50/40 p-6 text-sm text-rose-700">{error}</div>
        ) : (
          <NoteForm
            initial={{ title, description, category }}
            submitLabel="Update Note"
            onSubmit={async (payload) => {
              await updateNote(noteId, payload);
              router.replace("/");
            }}
          />
        )}
      </div>
    </main>
  );
}