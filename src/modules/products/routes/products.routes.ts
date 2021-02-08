import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import createProductValidator from '../validators/createProductValidator';
import deleteProductValidator from '../validators/deleteProductValidator';
import showProductValidator from '../validators/showProductValidator';
import updateProductValidator from '../validators/updateProductValidator';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', showProductValidator, productsController.show);

productsRouter.post('/', createProductValidator, productsController.create);

productsRouter.put('/:id', updateProductValidator, productsController.update);

productsRouter.delete('/:id', deleteProductValidator, productsController.delete);

export default productsRouter;
