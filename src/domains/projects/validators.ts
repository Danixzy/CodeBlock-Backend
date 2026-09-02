import Joi from 'joi';

export const createProjectSchema = Joi.object({
  title: Joi.string().max(120).required(),
  categoryId: Joi.number().integer().positive().required(),
  description: Joi.string().max(5000).required(),
  scope: Joi.string().max(5000).required(),
  budgetMin: Joi.number().min(0).required(),
  budgetMax: Joi.number().min(Joi.ref('budgetMin')).required()
    .messages({ 'number.min': 'budgetMax must be >= budgetMin' }),
  deadline: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({ 'string.pattern.base': 'deadline must be in YYYY-MM-DD format' }),
  skills: Joi.array().items(Joi.string().max(40)).max(15).required(),
});
