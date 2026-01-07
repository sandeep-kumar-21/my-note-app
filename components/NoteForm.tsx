"use client";
import { createNote } from "@/app/actions";
import { useRef, useTransition } from "react";
import { PlusCircle, Loader2 } from "lucide-react";

export default function NoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createNote(formData);
      formRef.current?.reset();
    });
  };

  return (
    <form 
      ref={formRef}
      action={handleSubmit}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-10 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20"
    >
      <div className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Title"
          className="text-xl font-semibold outline-none placeholder:text-slate-300"
          disabled={isPending}
          required
        />
        <textarea
          name="content"
          placeholder="Write your thoughts..."
          rows={3}
          className="outline-none text-slate-600 resize-none placeholder:text-slate-300"
          disabled={isPending}
          required
        />
        <button 
          disabled={isPending}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2.5 px-4 rounded-xl transition-all font-medium"
        >
          {isPending ? <Loader2 className="animate-spin" size={18} /> : <PlusCircle size={18} />}
          {isPending ? "Saving..." : "Add Note"}
        </button>
      </div>
    </form>
  );
}