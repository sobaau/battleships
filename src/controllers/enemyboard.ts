import { Request, Response, Router } from 'express';
import EnemyBoard from '../../models/EnemyBoard';

export const EnemyRouter = Router();

EnemyRouter.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await EnemyBoard.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

EnemyRouter.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const post = new EnemyBoard({
    player: req.body.player,
    Ship: req.body.Ship,
    board: req.body.board,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
