type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search notes</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder="Search notes..."
        className="w-full rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-rose-200"
      />
    </label>
  );
}
