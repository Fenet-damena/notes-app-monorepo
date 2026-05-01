import NoteCard from "../ui/NoteCard";
import type { Note } from "./types";

type NotesListProps = {
  notes: Note[];
  onDeleted?: () => void;
};

export default function NotesList({ notes, onDeleted }: NotesListProps) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDeleted={onDeleted} />
      ))}
    </div>
  );
}
