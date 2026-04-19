"use client";

import { useMemo, useState } from "react";
import FilterChips from "./FilterChips";
import { MOCK_NOTES } from "./mockNotes";
import Navbar from "./Navbar";
import NotesList from "./NotesList";
import SearchBar from "./SearchBar";
import type { NoteCategory } from "./types";

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<NoteCategory>("All");

  const filteredNotes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return MOCK_NOTES.filter((note) => {
      const matchesCategory = activeCategory === "All" || note.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Navbar />

      <section className="flex flex-col gap-4 rounded-xl bg-transparent">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterChips activeCategory={activeCategory} onChange={setActiveCategory} />
      </section>

      <NotesList notes={filteredNotes} />
    </main>
  );
}
