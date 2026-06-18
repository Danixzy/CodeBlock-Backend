import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  slug: Joi.string().min(1).max(255).required(),
});
