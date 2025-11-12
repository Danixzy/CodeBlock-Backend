import { Model } from '../../database/objection';

export class Product extends Model {
  id!: number;
  name!: string;
  description?: string;
  price!: number;
  stock!: number;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price', 'stock'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        stock: { type: 'integer', minimum: 0 },
      },
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
