import { Model } from 'objection';
import { db } from './knex';

// Give the knex instance to objection
Model.knex(db);

export { Model };
