import { Model } from '../../database/objection';
import { snakeCaseMappers } from 'objection';

export type UserRole = 'admin' | 'client';
export type AccountType = 'freelancer' | 'contractor' | 'explorer';

export class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: UserRole;
  accountType!: AccountType;
  bio?: string;
  location?: string;
  avatar_url?: string;
  avatarUrl?: string;
  created_at!: Date;
  updated_at!: Date;

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
        accountType: { type: 'string', enum: ['freelancer', 'contractor', 'explorer'] },
        bio: { type: ['string', 'null'] },
        location: { type: ['string', 'null'], maxLength: 255 },
        avatarUrl: { type: ['string', 'null'], maxLength: 500 },
      },
    };
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
