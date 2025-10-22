import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow(''),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(255),
  description: Joi.string().allow(''),
  price: Joi.number().min(0),
  stock: Joi.number().integer().min(0),
}).min(1);
