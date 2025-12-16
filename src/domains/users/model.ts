import { Model, snakeCaseMappers } from 'objection';

export type UserRole = 'admin' | 'client';

export class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['admin', 'client'] },
      },
    };
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
