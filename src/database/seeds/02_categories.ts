import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del();

  await knex('categories').insert([
    { name: 'Desenvolvimento Web', slug: 'desenvolvimento-web', is_active: true, created_at: new Date(), updated_at: new Date() },
    { name: 'Desenvolvimento Mobile', slug: 'desenvolvimento-mobile', is_active: true, created_at: new Date(), updated_at: new Date() },
    { name: 'Design UI/UX', slug: 'design-ui-ux', is_active: true, created_at: new Date(), updated_at: new Date() },
    { name: 'Dados e IA', slug: 'dados-e-ia', is_active: true, created_at: new Date(), updated_at: new Date() },
    { name: 'DevOps e Cloud', slug: 'devops-e-cloud', is_active: true, created_at: new Date(), updated_at: new Date() },
  ]);
}
