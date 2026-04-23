type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<label className="block">
			<span className="mb-2 block text-sm font-medium text-slate-700">Search Notes</span>
			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search notes..."
				className="w-full rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
			/>
		</label>
	);
}