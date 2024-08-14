import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWT } from '../JWT';
import { User, UserModel } from '../model/user.model';

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.get('Authorization')?.split(' ')?.[1];

    if (!token) {
      return next({
        message: 'Unauthorized',
        statusCode: StatusCodes.PRECONDITION_FAILED,
      });
    }

    const userId = JWT.verify(token as string)?.userId;

    if (!userId) {
      return next({
        message: 'Unauthorized',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return next({
        message: 'Unauthorized',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    if (!user?._id.equals(userId)) {
      return next({
        message: 'Unauthorized',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    (req as Request & { context: { user: User } }).context = { user };
    next();
  } catch (e: any) {
    return next({
      message: 'Unauthorized',
      statusCode: StatusCodes.PRECONDITION_FAILED,
    });
  }
};
