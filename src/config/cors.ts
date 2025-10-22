import { env } from './env';

export const corsOptions = {
  origin: env.cors.origin,
  credentials: true,
  optionsSuccessStatus: 200,
};
