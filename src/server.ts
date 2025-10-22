import app from './app';
import { env } from './config/env';
import { testConnection } from './database/knex';
import { logger } from './config/logger';

const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    await testConnection();

    // Start server
    app.listen(env.port, () => {
      logger.info(`🚀 Server running on port ${env.port}`);
      logger.info(`📝 Environment: ${env.nodeEnv}`);
      logger.info(`🏠 App Name: ${env.appName}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
