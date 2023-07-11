import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (req, res, next) => {
  try {
    // throw Error('oh no!');
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  next(Error('Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  let errorMessage = 'An unknown error occurred';
  if (err instanceof Error) errorMessage = err.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
