import express, { NextFunction, Request, Response } from "express";
import Restaurant from "../models/Restaurant.model";
import { IRestaurant } from "../interfaces/restaurant.interfaces";
import { FilterQuery } from "mongoose";
import { isAuthenticated } from "../middleware/jwt.middleware";
const router = express.Router();

// GET - '/' - List of all restaurants
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: FilterQuery<IRestaurant> = {};

    if (req.query.neighborhood) {
      query.neighborhood = req.query.neighborhood;
    }

    if (req.query.cuisineType) {
      query.cuisineType = req.query.cuisineType;
    }

    const restaurants: IRestaurant[] = await Restaurant.find<IRestaurant>(
      query
    );

    res.status(200).json(restaurants);
  } catch (error) {
    const err = error as Error;
    next({ ...err, message: "Failed to retrieve restaurants." });
  }
});

// GET - '/:restaurantId'        Details of restaurant by ID
router.get(
  "/:restaurantId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { restaurantId } = req.params;

      const restaurant = await Restaurant.findById<IRestaurant>(restaurantId);

      if (restaurant !== null) {
        res.status(200).json(restaurant);
      } else {
        res.status(404).json({ message: "Restaurant not found." });
      }
    } catch (error) {
      const err = error as Error;
      next({ ...err, message: "Failed to retrieve restaurant details." });
    }
  }
);

// POST - '/'       Create new restaurant(s)
router.post(
  "/",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { restaurants } = req.body;

      if (!Array.isArray(restaurants)) {
        return res
          .status(400)
          .send({ message: "Input should be an array of restaurants." });
      }

      // Add the createdBy field to each restaurant
      const authenticatedUserId = req.payload?._id;
      const restaurantsToCreate = restaurants.map((restaurant) => ({
        ...restaurant,
        createdBy: authenticatedUserId,
      }));

      const restaurantsCreated = await Restaurant.insertMany<IRestaurant>(
        restaurantsToCreate
      );

      res.status(200).json(restaurantsCreated);
    } catch (error) {
      const err = error as Error;
      next({ ...err, message: "Failed to create restaurants." });
    }
  }
);

interface AuthenticatedRequest extends Request {
  payload?: {
    _id: string;
  };
}

// PUT - "/:restaurantId"        Update specified restaurant by ID
router.put(
  "/:restaurantId",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { restaurantId } = req.params;
      const authenticatedUserId = req.payload?._id;

      const restaurant = await Restaurant.findById<IRestaurant>(restaurantId);

      if (restaurant?.createdBy !== authenticatedUserId) {
        res.status(403).json({ message: "Forbidden" });
      }

      const restaurantUpdated = await Restaurant.findByIdAndUpdate<IRestaurant>(
        restaurantId,
        req.body,
        { new: true }
      );

      if (restaurantUpdated !== null) {
        res.status(200).json(restaurantUpdated);
      } else {
        res.status(404).json({ message: "Restaurant not found." });
      }
    } catch (error) {
      const err = error as Error;
      next({ ...err, message: "Failed to update restaurant." });
    }
  }
);

// DELETE - "/:restaurantId"         Delete specified restaurant by ID
router.delete(
  "/:restaurantId",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { restaurantId } = req.params;
      const authenticatedUserId = req.payload?._id;

      const restaurant = await Restaurant.findById<IRestaurant>(restaurantId);

      if (restaurant?.createdBy !== authenticatedUserId) {
        res.status(403).json({ message: "Forbidden" });
      }

      const restaurantDeleted = await Restaurant.findByIdAndDelete<IRestaurant>(
        restaurantId
      );

      if (restaurantDeleted !== null) {
        res.status(200).json(restaurantDeleted);
      } else {
        res.status(404).json({ message: "Restaurant not found." });
      }
    } catch (error) {
      const err = error as Error;
      next({ ...err, message: "Failed to delete restaurant." });
    }
  }
);
