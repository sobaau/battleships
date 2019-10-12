import { Request, Response, Router } from 'express';
import { GetGames, GetUsers } from './room';

export const StatRouter = Router();

StatRouter.get('/', async (req: Request, res: Response) => {
  try {
    const obj = {
      ActiveUsers: GetUsers(),
      ActiveGames: GetGames(),
    };
    res.json(obj);
  } catch (err) {
    res.json({ message: err });
  }
});
