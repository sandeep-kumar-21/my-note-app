"use client";
import { useState } from "react";
import { deleteNote, updateNote } from "@/app/actions";
import { Trash2, Edit3, Check, X, Clock } from "lucide-react";
import { INote } from "@/types";

export default function NoteCard({ note }: { note: INote }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <form 
        action={async (formData) => {
          await updateNote(note._id, formData);
          setIsEditing(false);
        }}
        className="bg-indigo-50/50 p-6 rounded-2xl border-2 border-indigo-200 shadow-inner animate-in fade-in zoom-in duration-200"
      >
        <input
          name="title"
          defaultValue={note.title}
          className="w-full text-lg font-bold bg-transparent outline-none mb-2 border-b border-indigo-100 focus:border-indigo-400"
          autoFocus
        />
        <textarea
          name="content"
          defaultValue={note.content}
          rows={3}
          className="w-full bg-transparent outline-none text-slate-600 resize-none mb-4"
        />
        <div className="flex gap-2 justify-end">
          <button 
            type="button" 
            onClick={() => setIsEditing(false)}
            className="p-2 text-slate-400 hover:bg-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <button 
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Check size={20} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-slate-800">{note.title}</h2>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50"
          >
            <Edit3 size={18} />
          </button>
          <form action={deleteNote.bind(null, note._id)}>
            <button className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-slate-50">
              <Trash2 size={18} />
            </button>
          </form>
        </div>
      </div>
      <p className="text-slate-500 my-3 whitespace-pre-wrap">{note.content}</p>
      <div className="flex items-center gap-2 text-[12px] font-medium text-slate-400 mt-4">
        <Clock size={14} />
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}