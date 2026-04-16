import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
    status: { type: String, default: "active" }
  },
  { timestamps: true }
);

const User=model("User", userSchema);

console.log(User,"modelcreated");

export default User;