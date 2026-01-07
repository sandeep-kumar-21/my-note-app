import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import { INote } from "@/types";
import { StickyNote } from "lucide-react";

/**
 * Server Component: Home
 * Fetches notes directly from MongoDB and renders the UI.
 */
export default async function Home() {
  // 1. Establish database connection
  await connectDB();

  // 2. Fetch notes from MongoDB (sorted by newest first)
  // We use .lean() or JSON.parse/stringify to handle MongoDB ObjectID serialization
  const rawNotes = await Note.find().sort({ createdAt: -1 });
  const notes: INote[] = JSON.parse(JSON.stringify(rawNotes));

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 selection:bg-indigo-100">
      {/* Modern Navigation Header */}
      <nav className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-slate-200/60 p-4 mb-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <StickyNote size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-800">
              ZEN<span className="text-indigo-600">NOTES</span>
            </h1>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6">
        {/* Create Note Section */}
        <section className="mb-12">
          <NoteForm />
        </section>

        {/* Notes Feed Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1">
            Recent Thoughts
          </h2>
          
          {notes.length > 0 ? (
            <div className="grid gap-4">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <StickyNote className="text-slate-300" size={32} />
              </div>
              <h3 className="text-slate-800 font-semibold">No notes yet</h3>
              <p className="text-slate-400 text-sm">Your brilliant ideas will appear here.</p>
            </div>
          )}
        </section>
      </div>

      {/* Modern Footer Decor */}
      <footer className="mt-20 text-center">
        <p className="text-slate-300 text-[10px] font-medium tracking-[0.2em] uppercase">
          Built with Next.js & MongoDB
        </p>
      </footer>
    </main>
  );
}