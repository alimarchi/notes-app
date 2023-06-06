import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false }, // select false means that email and password won't be returned when we make a query to the db, unless we explicity ask for them
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
