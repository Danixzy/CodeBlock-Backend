import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.text('bio').nullable();
    table.string('location', 255).nullable();
    table.string('avatar_url', 500).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('bio');
    table.dropColumn('location');
    table.dropColumn('avatar_url');
  });
}
