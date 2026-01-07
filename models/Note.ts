import mongoose, { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

export default models.Note || model('Note', NoteSchema);