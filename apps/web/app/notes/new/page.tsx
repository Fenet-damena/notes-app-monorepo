"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import NoteForm from "@/components/forms/NoteForm";
import { createNote } from "@/components/services/api";

export default function NewNotePage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-rose-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Create New Note</h1>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to notes
          </Link>
        </div>

        <NoteForm
          onSubmit={async (payload) => {
            await createNote(payload);
            router.push("/");
          }}
        />
      </div>
    </main>
  );
}
