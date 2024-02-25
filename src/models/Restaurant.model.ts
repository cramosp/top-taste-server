import mongoose, { Schema } from "mongoose";
import {
  CuisineType,
  IRestaurant,
  IReview,
  Neighborhood,
} from "../interfaces/restaurant.interfaces";

const reviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
});

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  neighborhood: {
    type: String,
    enum: Object.values(Neighborhood),
    required: true,
  },
  photograph: { type: String, required: true },
  address: { type: String, required: true },
  latlng: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { type: String, required: true },
  cuisineType: {
    type: String,
    enum: Object.values(CuisineType),
    required: true,
  },
  operatingHours: { type: Map, of: String, required: true },
  reviews: [reviewSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Restaurant = mongoose.model<IRestaurant>(
  "Restaurant",
  restaurantSchema
);
