import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Opcional: Seeds de produtos para desenvolvimento
  // Remova ou comente em produção
  
  // Deletes ALL existing entries
  await knex('products').del();

  // Você pode adicionar produtos manualmente aqui se necessário
  // ou remover este arquivo completamente
}
