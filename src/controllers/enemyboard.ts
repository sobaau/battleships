import { Request, Response, Router } from 'express';
import Board from '../models/EnemyBoard';

export const EnemyRouter = Router();
/** Gets and saves data relating to the enemy canvas */

EnemyRouter.get('/:gameID', async (req: Request, res: Response) => {
  try {
    const mid: number = req.params.gameID.indexOf('&');
    const id = req.params.gameID.slice(0, mid);
    const name = req.params.gameID.slice(mid + 1, req.params.gameID.length);
    const posts = await Board.findOne({ roomID: id, player: name });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

EnemyRouter.post('/:gameID', async (req: Request, res: Response) => {
  const post = {
    roomID: req.params.gameID,
    player: req.body.player,
    boardCell: req.body.boardCell,
    lastMoveResult: req.body.lastMoveResult,
    enemyBoard: req.body.enemyBoard,
    importBoard: req.body.importBoard,
    shipCount: req.body.shipCount,
    state: req.body.state,
  };
  try {
    const savedPost = await Board.findOneAndUpdate({ roomID: req.params.gameID, player: req.body.player }, post, {
      upsert: true,
      new: true,
      runValidators: true,
    });
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
