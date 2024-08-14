import express from 'express';
import { AdminMiddleware } from '../middleware/AdminMiddleware';
import { AuthMiddleWare } from '../middleware/AuthMiddleware';

import { CardModel } from '../model/card.model';

const CardRouter = express.Router();

CardRouter.post(
  '/card',
  AuthMiddleWare,
  AdminMiddleware,
  async (req, res, next) => {
    try {
      const { card } = req.body;
      if (!card) {
        next({
          message: 'Missing Required Card!',
          statusCode: 400,
        });
      }

      await CardModel.create(card);

      res.send();
    } catch (error: any) {
      console.error('Error:', error);
      next(error);
    }
  },
);

export default CardRouter;
