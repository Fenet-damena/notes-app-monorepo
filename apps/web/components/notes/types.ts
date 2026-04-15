export type NoteCategory = "All" | "Work" | "Study" | "Personal";

export type Note = {
  id: number;
  title: string;
  description: string;
  category: Exclude<NoteCategory, "All">;
};
