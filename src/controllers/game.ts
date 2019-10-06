import { Request, Response } from 'express';
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

export const game = (req: Request, resp: Response) => {
  const id = req.query.id;

  const randomId = () => {
    let code = '';
    for (let i = 0; i < 8; i++) {
      const n = Math.floor(Math.random() * chars.length);
      code += chars.charAt(n);
    }
    return code;
  };

  if (id !== undefined) {
    resp.send('The id was ' + id);
  } else {
    resp.send({ id: randomId() });
    //resp.redirect('/?gameId=' + randomId());
  }
};

export class GameStatus {
  gameState: any;
  boardOne: any;
  boardTwo: any;
  roomID: string;
  constructor(room: string) {
    this.roomID = room;
  }
}
