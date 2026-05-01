import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between rounded-xl border border-rose-100 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notes App</h1>
        <p className="text-sm text-slate-600">Capture, search, and organize your notes.</p>
      </div>

      <Link
        href="/notes/new"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
      >
        + New Note
      </Link>
    </header>
  );
}
