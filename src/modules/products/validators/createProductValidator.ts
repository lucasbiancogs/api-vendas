import { celebrate, Joi, Segments } from 'celebrate';

const createProductValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  },
});

export default createProductValidator;
