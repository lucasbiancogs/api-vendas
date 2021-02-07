import { celebrate, Joi, Segments } from 'celebrate';

const showProductValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export default showProductValidator;
