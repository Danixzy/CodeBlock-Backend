import { Model, RelationMappings, snakeCaseMappers } from 'objection';
import { db } from '../../database/objection';

export type ProjectStatus = 'draft' | 'published' | 'closed';

export class Project extends Model {
  id!: number;
  contractorId!: number;
  categoryId!: number;
  title!: string;
  description!: string;
  scope!: string;
  budgetMin!: number;
  budgetMax!: number;
  deadline!: string;
  status!: ProjectStatus;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'projects';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['contractorId', 'categoryId', 'title', 'description', 'scope', 'budgetMin', 'budgetMax', 'deadline'],
      properties: {
        id: { type: 'integer' },
        contractorId: { type: 'integer' },
        categoryId: { type: 'integer' },
        title: { type: 'string', minLength: 10, maxLength: 120 },
        description: { type: 'string', minLength: 30, maxLength: 5000 },
        scope: { type: 'string', minLength: 30, maxLength: 5000 },
        budgetMin: { type: 'number', minimum: 0 },
        budgetMax: { type: 'number', minimum: 0 },
        deadline: { type: 'string' },
        status: { type: 'string', enum: ['draft', 'published', 'closed'] },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    const { Category } = require('../categories/model');
    const { Skill } = require('../skills/model');
    const { User } = require('../users/model');

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: { from: 'projects.category_id', to: 'categories.id' },
      },
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: 'projects.id',
          through: { from: 'project_skills.project_id', to: 'project_skills.skill_id' },
          to: 'skills.id',
        },
      },
      contractor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: { from: 'projects.contractor_id', to: 'users.id' },
      },
    };
  }
}
