import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors';
import { logger } from '../config/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error occurred:', error);

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      errors: error.errors,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
