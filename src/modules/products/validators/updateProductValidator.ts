import { celebrate, Joi, Segments } from 'celebrate';

const updateProductValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export default updateProductValidator;
