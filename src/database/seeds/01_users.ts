import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Insert seed users
  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'client',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
