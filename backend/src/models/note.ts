import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

// Define a TypeScript type based on the schema
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
