import { Request, Response, Router } from 'express';
import GameSchema from '../../models/GameState';

export const GameRouter = Router();

GameRouter.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await GameSchema.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

GameRouter.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const post = new GameSchema({
    CurrentTurn: req.body.CurrentTurn,
    Moves: req.body.Moves,
    GameStatus: req.body.GameStatus,
    ResP: req.body.ResP,
    ResE: req.body.ResE,
    PlayerName: req.body.PlayerName,
    EnemyName: req.body.EnemyName,
    Winner: req.body.Winner,
    EnemyShipsR: req.body.EnemyShipsR,
    PlayerShipsR: req.body.PlayerShipsR,
    SetupMessages: req.body.SetupMessages,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
