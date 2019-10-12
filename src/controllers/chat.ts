import { Request, Response, Router } from 'express';
import ChatHistory from '../models/ChatHistory';

export const ChatRouter = Router();

ChatRouter.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await ChatHistory.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

ChatRouter.post('/', async (req: Request, res: Response) => {
  const post = new ChatHistory({
    messages: req.body.messages,
  });
  try {
    const savedPost = await post.save();
    res.json(req.body);
  } catch (err) {
    res.json({ message: err });
  }
});

ChatRouter.get('/:gameId', async (req: Request, res: Response) => {
  try {
    const post = await ChatHistory.findById(req.params.gameId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

ChatRouter.patch('/:gameId', async (req, res) => {
  try {
    const updatePost = await ChatHistory.updateOne(
      { _id: req.params.gameId },
      { $set: { messages: req.body.messages } },
    );
    res.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});
