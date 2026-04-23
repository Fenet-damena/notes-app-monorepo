import type { Note } from "./types";

type NoteCardProps = {
	note: Note;
};

function formatDate(value?: string): string {
	if (!value) {
		return "";
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "";
	}

	return date.toLocaleDateString();
}

export default function NoteCard({ note }: NoteCardProps) {
	const formattedDate = formatDate(note.createdAt);

	return (
		<article className="rounded-xl border border-rose-100 bg-white p-5 shadow-sm transition hover:shadow-md">
			<div className="mb-3 flex items-start justify-between gap-3">
				<h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
				<span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">{note.category}</span>
			</div>

			<p className="text-sm leading-6 text-slate-700">{note.description}</p>

			<div className="mt-4 flex items-center justify-between">
				<p className="text-xs text-slate-500">{formattedDate ? `Created ${formattedDate}` : ""}</p>
				<div className="flex gap-2">
					<button
						type="button"
						className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
					>
						Edit
					</button>
					<button
						type="button"
						className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
					>
						Delete
					</button>
				</div>
			</div>
		</article>
	);
}