import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Opcional: Seeds de usuários para desenvolvimento
  // Remova ou comente em produção
  
  // Deletes ALL existing entries
  await knex('users').del();

  // Você pode adicionar usuários manualmente aqui se necessário
  // ou remover este arquivo completamente
}
