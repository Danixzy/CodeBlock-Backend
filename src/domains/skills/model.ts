import { Model } from '../../database/objection';

export class Skill extends Model {
  id!: number;
  name!: string;
  slug!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'skills';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        slug: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }
}
