"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchNoteById, updateNote } from "@/components/notes/api";
import type { NoteCategoryValue } from "@/components/notes/types";

const CATEGORIES: NoteCategoryValue[] = ["Work", "Study", "Personal"];

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const noteId = Number(params.id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<NoteCategoryValue>("Work");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await updateNote(noteId, {
        title: title.trim(),
        description: description.trim(),
        category
      });

      router.replace("/");
    } catch {
      setError("Failed to update note. Please check the API and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-rose-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Enter note title"
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value as NoteCategoryValue)}
                className="w-full rounded-lg border border-rose-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
                Content
              </label>
              <textarea
                id="description"
                rows={7}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-lg border border-rose-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Write your note content"
              />
            </div>

            {error ? <p className="text-sm text-rose-700">{error}</p> : null}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Updating..." : "Update Note"}
              </button>
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}