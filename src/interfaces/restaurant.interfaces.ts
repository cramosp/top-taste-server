import { Document, Types } from "mongoose";

export interface IReview extends Document {
  name: string;
  date: string;
  rating: number;
  comments: string;
}

export enum Neighborhood {
  Queens = "Queens",
  Manhattan = "Manhattan",
  Brooklyn = "Brooklyn",
}

export enum CuisineType {
  Mexican = "Mexican",
  Asian = "Asian",
  American = "American",
  Pizza = "Pizza",
}

export interface IRestaurant extends Document {
  id: number;
  name: string;
  neighborhood: Neighborhood;
  photograph: string;
  address: string;
  latlng: {
    lat: number;
    lng: number;
  };
  image: string;
  cuisineType: CuisineType;
  operatingHours: {
    [day: string]: string;
  };
  reviews: IReview[];
  createdBy: Types.ObjectId;
}
