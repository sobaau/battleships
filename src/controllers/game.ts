import { Request, Response } from 'express';
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

/**  Credit to William Billingsley for the random generator
 * https://gitlab.une.edu.au/cosc360in2018/express-typescript-seed/blob/master/app/controllers/welcome.controller.ts
 */

export const game = (req: Request, resp: Response) => {
  const randomId = (): any => {
    let code = '';
    for (let i = 0; i < 8; i++) {
      const n = Math.floor(Math.random() * chars.length);
      code += chars.charAt(n);
    }
    return code;
  };
  resp.send({ id: randomId() });
};
