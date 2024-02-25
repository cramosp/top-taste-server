// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import dotenv from "dotenv";
dotenv.config();

// ℹ️ Connects to the database
import "./db";

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express, { Express } from "express";
const app: Express = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import setupMiddleware from "./config";
setupMiddleware(app);

// 👇 Start handling routes here
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

import authRoutes from "./routes/auth.routes";
app.use("/auth", authRoutes);

import usersRoutes from "./routes/user.routes";
app.use("/user", usersRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import errorHandling from "./error-handling";
errorHandling(app);

export default app;
