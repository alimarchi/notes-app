import { RequestHandler } from "express";
import createHttpError from "http-errors";

// middleware function that checks if the user is authenticated before allowing the access

export const requiresAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next(); // Passes the request to the next middleware or endpoint function
  } else {
    next(createHttpError(401, "User not authenticated.")); // triggers the error middleware
  }
};