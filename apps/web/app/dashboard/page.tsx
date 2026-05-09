"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { fetchNotes } from "@/components/services/api";
import type { Note, NoteCategoryValue } from "@/components/notes/types";

type CategoryStats = {
  [key in NoteCategoryValue]: number;
};

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError("Failed to fetch notes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Calculate statistics
  const totalNotes = notes.length;
  const categoryStats: CategoryStats = {
    Work: notes.filter((n) => n.category === "Work").length,
    Study: notes.filter((n) => n.category === "Study").length,
    Personal: notes.filter((n) => n.category === "Personal").length
  };

  // Get recent notes (last 3, sorted by date)
  const recentNotes = [...notes]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  const getCategoryColor = (category: NoteCategoryValue) => {
    switch (category) {
      case "Work":
        return "bg-blue-500";
      case "Study":
        return "bg-purple-500";
      case "Personal":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="text-center">Loading dashboard...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pageBg">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-2 text-lg text-slate-600">Get an overview of all your notes and analytics.</p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Notes Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 p-6 shadow-lg transition hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-300">Total Notes</p>
                <p className="mt-2 text-4xl font-bold text-white">{totalNotes}</p>
              </div>
              <div className="rounded-full bg-slate-600 p-3 text-white text-2xl">📝</div>
            </div>
          </div>

          {/* Work Notes Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg transition hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-100">Work Notes</p>
                <p className="mt-2 text-4xl font-bold text-white">{categoryStats.Work}</p>
              </div>
              <div className="rounded-full bg-blue-400 p-3 text-white text-2xl">💼</div>
            </div>
          </div>

          {/* Study Notes Card */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg transition hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-100">Study Notes</p>
                <p className="mt-2 text-4xl font-bold text-white">{categoryStats.Study}</p>
              </div>
              <div className="rounded-full bg-purple-400 p-3 text-white text-2xl">📚</div>
            </div>
          </div>

          {/* Personal Notes Card */}
          <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 p-6 shadow-lg transition hover:shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-pink-100">Personal Notes</p>
                <p className="mt-2 text-4xl font-bold text-white">{categoryStats.Personal}</p>
              </div>
              <div className="rounded-full bg-pink-400 p-3 text-white text-2xl">✨</div>
            </div>
          </div>
        </div>

        {/* Recent Notes Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Recent Notes</h2>

          {recentNotes.length > 0 ? (
            <div className="space-y-4">
              {recentNotes.map((note) => (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="block rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:border-pink-300 hover:bg-pink-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
                      <p className="mt-1 line-clamp-2 text-slate-600">{note.description}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${getCategoryColor(
                            note.category
                          )}`}
                        >
                          {note.category}
                        </span>
                        {note.createdAt && (
                          <span className="text-xs text-slate-500">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 text-2xl">→</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-slate-600">No notes yet. Create your first note to get started!</p>
              <Link
                href="/notes/new"
                className="mt-4 inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-white transition hover:bg-primary/90"
              >
                Create Note
              </Link>
            </div>
          )}
        </div>

        {/* Quick Action */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-white">Ready to create a new note?</h3>
          <p className="mt-2 text-pink-100">Start capturing your ideas now.</p>
          <Link
            href="/notes/new"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            + New Note
          </Link>
        </div>
      </main>
    </div>
  );
}
