import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  DB_URL: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  JWT_SECRET: Joi.string().required(),
});
