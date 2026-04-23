export type NoteCategory = "All" | "Work" | "Study" | "Personal";

export type NoteCategoryValue = Exclude<NoteCategory, "All">;

export type Note = {
  id: number;
  title: string;
  description: string;
  category: NoteCategoryValue;
  createdAt?: string;
};
