import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

// ℹ️ Handles password encryption
import bcrypt from "bcrypt";

// ℹ️ Handles password encryption
import jwt from "jsonwebtoken";

// Require the User model in order to interact with the database
import { User } from "../models/User.model";

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
import { isAuthenticated } from "../middleware/jwt.middleware";
import { AuthenticatedRequest } from "../core/types";
import { IUser } from "../interfaces/user.interfaces";

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;

      // Check if email or password or name are provided as empty strings
      if (email === "" || password === "" || name === "") {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
      }

      // Check the users collection if a user with the same email already exists
      const foundUser = await User.findOne({ email });

      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      const createdUser: IUser = await User.create({
        email,
        password: hashedPassword,
        name,
      });

      // Send a json response containing the user object
      res.status(201).json({
        user: {
          _id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
      });
    } catch (error) {
      next(error); // In this case, we send error handling to the error handling middleware.
    }
  }
);

// POST  /auth/login - Verifies email and password and returns a JWT
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      // Check if email or password are provided as empty string
      if (email === "" || password === "") {
        res.status(400).json({ message: "Provide email and password." });
        return;
      }

      // Check the users collection if a user with the same email exists
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET!, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ user: payload, authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    } catch (error) {
      next(error); // In this case, we send error handling to the error handling middleware.
    }
  }
);

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get(
  "/verify",
  isAuthenticated,
  (req: AuthenticatedRequest, res: Response) => {
    console.log(`req.payload`, req);

    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
  }
);

export default router;
