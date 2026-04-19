import NoteCard from "./NoteCard";
import type { Note } from "./types";

type NotesListProps = {
  notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-rose-300 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
        No notes found. Try another search or filter.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
