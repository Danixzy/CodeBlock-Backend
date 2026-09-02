import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table
      .enu('account_type', ['freelancer', 'contractor', 'explorer'])
      .notNullable()
      .defaultTo('explorer');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('account_type');
  });
}
