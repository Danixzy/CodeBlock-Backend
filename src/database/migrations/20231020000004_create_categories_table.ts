import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table.string('slug', 255).notNullable().unique();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('categories');
}
