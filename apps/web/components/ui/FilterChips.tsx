import type { NoteCategory } from "../notes/types";

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
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 hover:-translate-y-0.5 ${
              isActive
                ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                : "border-rose-200 bg-white text-slate-700 hover:border-primary/40 hover:bg-rose-50 hover:text-primary"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
