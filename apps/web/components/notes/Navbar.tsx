import Link from "next/link";

export default function Navbar() {
  return (
    <header className="rounded-xl bg-primary px-5 py-4 shadow-sm sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Notes App</h1>
        <Link
          href="/notes/new"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          + New Note
        </Link>
      </div>
    </header>
  );
}
