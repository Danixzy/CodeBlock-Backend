import { Model } from '../../database/objection';

export class Category extends Model {
  id!: number;
  name!: string;
  slug!: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        slug: { type: 'string', minLength: 1, maxLength: 255 },
        isActive: { type: 'boolean' },
      },
    };
  }
}
