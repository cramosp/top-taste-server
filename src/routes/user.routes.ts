import express, { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../core/types";
import { IUser } from "../interfaces/user.interfaces";
import { isAuthenticated } from "../middleware/jwt.middleware";
import { User } from "../models/User.model";

const router = express.Router();

// GET - "/" - Get authenticated user details.
router.get(
  "/",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = req.payload?._id;

      const authenticatedUser = await User.findById<IUser>(authenticatedUserId);

      if (authenticatedUser !== null) {
        res.status(200).json(authenticatedUser);
      } else {
        res.status(404).json("User not found.");
      }
    } catch (error) {
      const err = error as Error;
      next({
        ...err,
        message: "Failed to get user details.",
      });
    }
  }
);

// PUT - "/restaurants" - Update favourite restaurants by userId.
router.put(
  "/restaurants",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = req.payload?._id;

      // Find user by id and update favoriteRestaurants.
      // $addToSet: { favoriteRestaurants: { $each: restaurantIds } } - This line adds
      // restaurants coming in the payload into the user favoriteRestaurants field.
      const userUpdated = await User.findByIdAndUpdate<IUser>(
        authenticatedUserId,
        { $addToSet: { favoriteRestaurants: { $each: req.body } } },
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

// DELETE - "/:userId/restaurants/:restaurantId" - Update favourite restaurants by userId.
router.delete(
  "/restaurants/:restaurantId",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authenticatedUserId = req.payload?._id;
      const { restaurantId } = req.params;

      // Find user by id and update favoriteRestaurants.
      // $addToSet: { favoriteRestaurants: { $each: restaurantIds } } - This line adds
      // restaurants coming in the payload into the user favoriteRestaurants field.
      const userUpdated = await User.findByIdAndUpdate<IUser>(
        authenticatedUserId,
        { $pull: { favoriteRestaurants: restaurantId } },
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
        message: "Failed to delete this restaurant from favourites.",
      });
    }
  }
);

export default router;
