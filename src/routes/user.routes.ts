import express, { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../core/types";
import { IUser } from "../interfaces/user.interfaces";
import { isAuthenticated } from "../middleware/jwt.middleware";
import { User } from "../models/User.model";

const router = express.Router();

// PUT - "/:userId/restaurants" - Update favourite restaurants by userId.
router.put(
  "/:userId/restaurants",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { restaurantIds } = req.body;
      const authenticatedUserId = req.payload?._id;

      // Find user by id and update favoriteRestaurants.
      // $addToSet: { favoriteRestaurants: { $each: restaurantIds } } - This line adds
      // restaurants coming in the payload into the user favoriteRestaurants field.
      const userUpdated = User.findByIdAndUpdate<IUser>(
        authenticatedUserId,
        { $addToSet: { favoriteRestaurants: { $each: restaurantIds } } },
        { new: true }
      );

      if (userUpdated !== null) {
        res.status(200).json(userUpdated);
      } else {
        res.status(404).json("User not found.");
      }
    } catch (error) {
      const err = error as Error;
      next({
        ...err,
        message: "Failed to update the favourite restaurants.",
      });
    }
  }
);
