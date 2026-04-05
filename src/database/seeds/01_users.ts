import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const passwordHash = await bcrypt.hash('123456', 10);

  await knex('users').insert([
    {
      name: 'Usuario Admin',
      email: 'admin@example.com',
      password: passwordHash,
    },
  ]);
}
