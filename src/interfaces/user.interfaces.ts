import { Types, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  favoriteRestaurants: Types.ObjectId[];
}
