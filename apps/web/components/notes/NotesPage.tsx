"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchNotes } from "../services/api";
import FilterChips from "../ui/FilterChips";
import Navbar from "../layout/Navbar";
import NotesList from "./NotesList";
import SearchBar from "../ui/SearchBar";
import type { Note, NoteCategory } from "./types";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<NoteCategory>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchNotes();
      setNotes(response);
      setError(null);
    } catch {
      setError("Unable to load notes. Please check that the API is running.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return notes.filter((note) => {
      const matchesCategory = activeCategory === "All" || note.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, notes, searchTerm]);

  const hasActiveFilters = searchTerm.trim().length > 0 || activeCategory !== "All";

  function clearFilters() {
    setSearchTerm("");
    setActiveCategory("All");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="space-y-8 rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_rgba(148,163,184,0.18)] backdrop-blur sm:p-8">
        <Navbar />

        <section className="grid gap-4 rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50 to-orange-50 p-5 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] lg:items-end">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Day 9 upgrade</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Search, filter, and manage notes faster.</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Find notes instantly by title or content, switch categories with one tap, and keep the list tidy with built-in delete confirmation.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-rose-100">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <FilterChips activeCategory={activeCategory} onChange={setActiveCategory} />
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear filters
              </button>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
          <p>{isLoading ? "Loading notes..." : `${filteredNotes.length} of ${notes.length} notes shown`}</p>
          {hasActiveFilters ? (
            <button type="button" onClick={clearFilters} className="font-medium text-rose-700 transition hover:text-rose-800">
              Reset search and filter
            </button>
          ) : null}
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-rose-100 bg-white p-6 text-sm text-slate-600 shadow-sm">Loading notes...</div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
        ) : filteredNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-rose-300 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
            <p className="font-medium text-slate-700">No notes found.</p>
            <p className="mt-1">Try another search term or switch to a different category.</p>
          </div>
        ) : (
          <NotesList notes={filteredNotes} onDeleted={loadNotes} />
        )}
      </div>
    </main>
  );
}
