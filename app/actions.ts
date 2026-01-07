"use server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  await connectDB();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
  if (!title || !content) return;

  await Note.create({ title, content });
  revalidatePath("/");
}

export async function deleteNote(id: string) {
  await connectDB();
  await Note.findByIdAndDelete(id);
  revalidatePath("/");
}

export async function updateNote(id: string, formData: FormData) {
  await connectDB();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await Note.findByIdAndUpdate(id, { title, content });
  revalidatePath("/");
}