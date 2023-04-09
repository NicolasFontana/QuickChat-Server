// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';

const createUserValidation = (req, res, next) => {
  const Schema = Joi.object({
    username: Joi.string().min(3).max(40).required()
      .messages({
        'string.base': 'Invalid username, it must be a string',
        'string.min': 'Username must contain more than 3 letters',
        'string.max': 'Username must not contain more than 50 letters',
        'string.empty': 'Username is a required field',
      }),
    email: Joi.string()
      .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      .required()
      .messages({
        'string.base': 'Invalid email, it must be a string',
        'string.pattern.base': 'Invalid email format',
        'string.empty': 'Email is a required field',
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
      .required()
      .messages({
        'string.base': 'Invalid password, it must be a string',
        'string.min': 'Password must contain at least 8 characters',
        'string.pattern.base': 'Password must contain both letters and numbers',
        'string.empty': 'Password is a required field',
      }),
    confirmPassword: Joi.string().equal(Joi.ref('password')).messages({
      'any.only': "Passwords don't match",
    }),
    avatarImage: Joi.string().allow('').required().messages({
      'string.base': 'Invalid avatar image, it must be a string',
      'string.empty': 'Avatar image is a required field',
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

export default createUserValidation;
