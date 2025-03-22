import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";

const Errors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
    if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });

};
export default Errors;
