import { NextFunction, Request, Response } from 'express';

export const ErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res
    .status((err as any).status || (err as any).statusCode || 500)
    .send(err.message);
};
