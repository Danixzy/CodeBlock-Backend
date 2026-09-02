import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('skills').del();

  await knex('skills').insert([
    { name: 'React', slug: 'react', created_at: new Date(), updated_at: new Date() },
    { name: 'Node.js', slug: 'nodejs', created_at: new Date(), updated_at: new Date() },
    { name: 'TypeScript', slug: 'typescript', created_at: new Date(), updated_at: new Date() },
    { name: 'Python', slug: 'python', created_at: new Date(), updated_at: new Date() },
    { name: 'JavaScript', slug: 'javascript', created_at: new Date(), updated_at: new Date() },
    { name: 'Figma', slug: 'figma', created_at: new Date(), updated_at: new Date() },
    { name: 'Vue.js', slug: 'vuejs', created_at: new Date(), updated_at: new Date() },
    { name: 'Docker', slug: 'docker', created_at: new Date(), updated_at: new Date() },
  ]);
}
