import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWT } from '../JWT';
import { User, UserModel } from '../model/user.model';

export const AdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as Request & { context: { user: User } }).context.user;

    if (!user || !user.admin) {
      next({
        message: 'Unauthorized',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    next();
  } catch (e: any) {
    return next({
      message: 'Unauthorized',
      statusCode: StatusCodes.PRECONDITION_FAILED,
    });
  }
};
