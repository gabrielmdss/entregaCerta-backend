import { NextFunction, Request, Response } from "express";
import { toAppError } from "../utils/sql.errors.code";
import * as status from "../utils/http.status";

const Errors = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const appError = toAppError(error);

  // Log apenas de erros inesperados (5xx), no servidor, sem o corpo da requisição.
  if (appError.statusCode >= status.INTERNAL_SERVER) {
    console.error(`[${req.method} ${req.originalUrl}]`, appError.cause ?? appError);
  }

  return res.status(appError.statusCode).json({
    status: "error",
    statusCode: appError.statusCode,
    message: appError.message,
  });
};
export default Errors;
