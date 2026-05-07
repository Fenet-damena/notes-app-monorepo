type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const hasValue = value.trim().length > 0;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">Search notes</span>
      <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 py-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title or description"
          className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
        />
        {hasValue ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200 hover:text-slate-800"
          >
            Clear
          </button>
        ) : null}
      </div>
    </label>
  );
}
