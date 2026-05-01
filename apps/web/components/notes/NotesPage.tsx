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

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Navbar />

      <section className="flex flex-col gap-4 rounded-xl bg-transparent">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterChips activeCategory={activeCategory} onChange={setActiveCategory} />
      </section>

      {isLoading ? (
        <div className="rounded-xl border border-rose-100 bg-white p-6 text-sm text-slate-600 shadow-sm">Loading notes...</div>
      ) : error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
      ) : filteredNotes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-rose-300 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          No notes found. Try another search or filter.
        </div>
      ) : (
        <NotesList notes={filteredNotes} onDeleted={loadNotes} />
      )}
    </main>
  );
}
