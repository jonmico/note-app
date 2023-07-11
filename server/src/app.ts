import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', notesRoutes);

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
