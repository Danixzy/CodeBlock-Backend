import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('project_skills', (table) => {
    table.integer('project_id').unsigned().notNullable()
      .references('id').inTable('projects').onDelete('CASCADE');
    table.integer('skill_id').unsigned().notNullable()
      .references('id').inTable('skills').onDelete('CASCADE');
    table.primary(['project_id', 'skill_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('project_skills');
}
