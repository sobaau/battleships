import { Request, Response, Router } from 'express';
import Board from '../models/PlayerBoard';

export const PlayerRouter = Router();

/** Gets and saves data relating to the player canvas */

PlayerRouter.get('/:gameID', async (req: Request, res: Response) => {
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

/** Updates the data on the server OR creates a new entry if it's not on the server */

PlayerRouter.post('/:gameID', async (req: Request, res: Response) => {
  const post = {
    roomID: req.params.gameID,
    player: req.body.player,
    boardCell: req.body.boardCell,
    state: req.body.state,
    ship: req.body.ship,
    playerBoard: req.body.playerBoard,
    shipCells: req.body.shipCells,
    ships: req.body.ships,
    currentShip: req.body.currentShip,
    exported: req.body.exported,
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
