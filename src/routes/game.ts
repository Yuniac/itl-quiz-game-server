import express from 'express';
import { AdminMiddleware } from '../middleware/AdminMiddleware';
import { AuthMiddleWare } from '../middleware/AuthMiddleware';
import { Game, GameModel } from '../model/game.model';

const GameRouter = express.Router();

GameRouter.post(
  '/game',
  AuthMiddleWare,
  AdminMiddleware,
  async (req, res, next) => {
    try {
      const { name, date, participants } = req.body as Game;

      await GameModel.create({ name, date, participants });

      res.send();
    } catch (error: any) {
      console.error('Error:', error);
      next(error);
    }
  },
);

export default GameRouter;
