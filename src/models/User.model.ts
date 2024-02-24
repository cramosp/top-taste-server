import { Schema, model, Document, Types } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  restaurants: Types.ObjectId[];
}

const userSchema= new Schema<IUser>(
  {name: {
    type: String,
    required: [true, "Name is required."],
  },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    restaurants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
export type UserDocument = IUser;
