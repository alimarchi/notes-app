import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next(); // pass to the endpoint function
  } else {
    next(createHttpError(401, "User not authenticated.")); // triggers the error middleware
  }
};
