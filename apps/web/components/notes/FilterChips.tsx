import type { NoteCategory } from "./types";

const CATEGORIES: NoteCategory[] = ["All", "Work", "Study", "Personal"];

type FilterChipsProps = {
  activeCategory: NoteCategory;
  onChange: (category: NoteCategory) => void;
};

export default function FilterChips({ activeCategory, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-rose-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
