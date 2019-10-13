import { Request, Response, Router } from 'express';
import GameSchema from '../models/GameState';

export const GameRouter = Router();
/** Gets the data relating to the game State */

GameRouter.get('/:gameID', async (req: Request, res: Response) => {
  try {
    const mid: number = req.params.gameID.indexOf('&');
    const id = req.params.gameID.slice(0, mid);
    const name = req.params.gameID.slice(mid + 1, req.params.gameID.length);
    const posts = await GameSchema.findOne({ roomID: id });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
/** Updates the data on the server OR creates a new entry if it's not on the server */
GameRouter.post('/:gameID', async (req: Request, res: Response) => {
  const post = {
    roomID: req.params.gameID,
    player: req.body.PlayerName,
    state: req.body.state,
  };
  try {
    const savedPost = await GameSchema.findOneAndUpdate({ roomID: req.params.gameID }, post, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
