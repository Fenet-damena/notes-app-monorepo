import type { Note } from "./types";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">{note.title}</h2>
          <p className="text-sm text-slate-600 sm:text-base">{note.description}</p>
          <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {note.category}
          </span>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-start">
          <button
            type="button"
            className="text-sm font-medium text-primary transition hover:text-rose-700"
          >
            Edit
          </button>
          <button
            type="button"
            className="text-sm font-medium text-rose-500 transition hover:text-rose-600"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
