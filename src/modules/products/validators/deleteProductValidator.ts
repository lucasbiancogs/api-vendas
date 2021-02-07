import { celebrate, Joi, Segments } from 'celebrate';

const deleteProductValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export default deleteProductValidator;
