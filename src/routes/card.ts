import express from 'express';
import { AdminMiddleware } from '../middleware/AdminMiddleware';
import { AuthMiddleWare } from '../middleware/AuthMiddleware';

import { Card, CardModel } from '../model/card.model';

const CardRouter = express.Router();

CardRouter.post(
  '/card',
  AuthMiddleWare,
  AdminMiddleware,
  async (req, res, next) => {
    try {
      const { name, score } = req.body as Card;

      if (!req.body) {
        next({
          message: 'Missing Required Card!',
          statusCode: 400,
        });
      }

      await CardModel.create({ name, score });

      res.send();
    } catch (error: any) {
      console.error('Error:', error);
      next(error);
    }
  },
);

CardRouter.get('/card', AuthMiddleWare, async (req, res, next) => {
  try {
    const cards = await CardModel.find();

    res.send(cards);
  } catch (error: any) {
    console.error('Error:', error);
    next(error);
  }
});

// CardRouter.post('/card/populate', (req, res, next) => {
//   try {
//     const markdownFilePath = 'src/routes/games.md';

//     readFile(markdownFilePath, 'utf8', (err: any, data: any) => {
//       if (err) {
//         console.error('Error reading the file:', err);
//         return res.status(500).send('Error reading the file');
//       }

//       const listItemRegex = /^\s*(.+?)\s*[-=]\s*(\d+)\s*$/gm;
//       let match;

//       while ((match = listItemRegex.exec(data)) !== null) {
//         const name = match[1].trim();
//         const score = parseInt(match[2].trim(), 10);

//         CardModel.create({ name, score });
//       }

//       res.status(200).send('File processed successfully');
//     });
//   } catch (e: any) {
//     next(e);
//   }
// });

export default CardRouter;
