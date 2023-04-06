// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';

const createMessageValidation = (req, res, next) => {
  const Schema = Joi.object({
    from: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      .messages({
        'string.base': 'Invalid user sender id, it must be a string',
        'string.empty': 'User sender id cannot be empty',
        'string.pattern.base': 'Invalid user sender ID format',
        'any.required': 'User sender ID is a required field',
      }),
    to: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      .messages({
        'string.base': 'Invalid user receiver id, it must be a string',
        'string.empty': 'User receiver id cannot be empty',
        'string.pattern.base': 'Invalid user receiver ID format',
        'any.required': 'User receiver ID is a required field',
      }),
    message: Joi.string().required().messages({
      'string.base': 'Invalid message, it must be a string',
      'string.empty': 'Message cannot be empty',
      'any.required': 'Message text is a required field',
    }),
  });

  const validation = Schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: null,
      error: true,
    });
  }

  return next();
};

export default createMessageValidation;
