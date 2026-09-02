import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('project_applications', (table) => {
    table.increments('id').primary();
    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE');
    table.integer('freelancer_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.decimal('proposed_value', 14, 2).notNullable();
    table.text('proposal_text').notNullable();
    table.enum('status', ['pending', 'accepted', 'rejected']).notNullable().defaultTo('pending');
    table.timestamps(true, true);
    table.unique(['project_id', 'freelancer_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('project_applications');
}
