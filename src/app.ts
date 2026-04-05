import express, { Application, Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { corsOptions } from './config/cors';
import { morganLogger } from './config/logger';
import { errorHandler } from './middlewares/errorHandler';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import routes from './routes';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression() as unknown as RequestHandler);

// Logging
app.use(morganLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  limit: env.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api', routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
