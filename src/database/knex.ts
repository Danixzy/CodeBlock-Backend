import knex from 'knex';
import knexConfig from '../../knexfile';
import { env } from '../config/env';

const environment = env.nodeEnv === 'production' ? 'production' : 'development';

export const db = knex(knexConfig[environment]);

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1');
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};
