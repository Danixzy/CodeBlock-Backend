import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.integer('contractor_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('category_id').unsigned().notNullable()
      .references('id').inTable('categories').onDelete('RESTRICT');
    table.string('title', 120).notNullable();
    table.text('description').notNullable();
    table.text('scope').notNullable();
    table.decimal('budget_min', 14, 2).notNullable();
    table.decimal('budget_max', 14, 2).notNullable();
    table.date('deadline').notNullable();
    table.enum('status', ['draft', 'published', 'closed']).notNullable().defaultTo('published');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('projects');
}
