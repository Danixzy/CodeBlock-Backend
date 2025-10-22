import { Model } from "objection";


export class Product extends Model {
  id!: number;
  name!: string;
  description?: string;
  price!: number;
  stock!: number;
  createdAt!: Date;
  updatedAt!: Date;

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
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
