import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/user";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

// configure cors
app.use(cors());

// morgan library, HTTP request logger middleware for node.js
app.use(morgan("dev"));

app.use(express.json());

// Configure session
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false, // Prevents the session from being saved on every request
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // Sets the session to expire after 1 hour (in milliseconds)
    },
    rolling: true, // Updates the expiration time of the session on every request
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING, // MongoDB connection string for storing the session data
    }),
  })
);

// mounts the routes for user and notes
app.use("/api/user", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

// Handles requests for unknown endpoints by creating a 404 error
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error handling middleware

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unkown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status; // Extracts the HTTP status code from the error
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
