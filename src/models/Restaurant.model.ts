import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document {
  name: string;
  date: string;
  rating: number;
  comments: string;
}

interface IRestaurant extends Document {
  id: number;
  name: string;
  neighborhood: string;
  photograph: string;
  address: string;
  latlng: {
    lat: number;
    lng: number;
  };
  image: string;
  cuisine_type: string;
  operating_hours: {
    [day: string]: string;
  };
  reviews: IReview[];
}

const reviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
});

enum Neighborhood {
  Queens = "Queens",
  Manhattan = "Manhattan",
  Brooklyn = "Brooklyn",
}

enum CuisineType {
  Mexican = "Mexican",
  Asian = "Asian",
  American = "American",
  Pizza = "Pizza",
}

const restaurantSchema = new Schema<IRestaurant>({
  id: { type: Number, required: true },
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
  cuisine_type: {
    type: String,
    enum: Object.values(CuisineType),
    required: true,
  },
  operating_hours: { type: Map, of: String, required: true },
  reviews: [reviewSchema],
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", restaurantSchema);
export default Restaurant;
