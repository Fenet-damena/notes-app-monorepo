"use client";

import type { Note } from "../notes/types";
import Link from "next/link";
import { useState } from "react";
import { deleteNote } from "../services/api";

type NoteCardProps = {
  note: Note;
  onDeleted?: () => void;
};

function formatDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString();
}

export default function NoteCard({ note, onDeleted }: NoteCardProps) {
  const formattedDate = formatDate(note.createdAt);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${note.title}"?`);
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deleteNote(note.id);
      onDeleted?.();
    } catch {
      setError("Unable to delete this note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <article className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">{note.category}</span>
      </div>

      <p className="text-sm leading-6 text-slate-700">{note.description}</p>

      {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">{formattedDate ? `Created ${formattedDate}` : ""}</p>
        <div className="flex gap-2">
          <Link
            href={`/notes/${note.id}`}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
