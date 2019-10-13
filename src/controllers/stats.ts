import { Request, Response, Router } from 'express';
import { GetUsers } from './room';

export const StatRouter = Router();
const moveStats = { Hits: 0, Misses: 0 };

/** Sends Hits, misses and player count to the client */
StatRouter.get('/', async (req: Request, res: Response) => {
  try {
    const obj = {
      ActiveUsers: GetUsers(),
      Hits: moveStats.Hits,
      Misses: moveStats.Misses,
    };
    res.json(obj);
  } catch (err) {
    res.json({ message: err });
  }
});

export const statHit = (): void => {
  moveStats.Hits = moveStats.Hits + 1;
  console.log(moveStats);
};

export const statMiss = (): void => {
  moveStats.Misses = moveStats.Misses + 1;
};
