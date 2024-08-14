import express from 'express';

import { CardModel } from '../model/card.model';

const CardRouter = express.Router();

CardRouter.post('/card', async (req, res, next) => {
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
});

export default CardRouter;
