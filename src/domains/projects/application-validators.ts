import Joi from 'joi';

export const applyProjectSchema = Joi.object({
  proposedValue: Joi.number().positive().required()
    .messages({ 'number.positive': 'Proposed value must be greater than zero' }),
  proposalText: Joi.string().min(20).max(3000).required()
    .messages({ 'string.min': 'Proposal text must have at least 20 characters' }),
});
