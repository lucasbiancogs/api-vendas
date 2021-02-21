import { Router } from 'express';
import isAuthenticated from '../../users/middlewares/isAuthenticated';
import ProductsController from '../controllers/ProductsController';
import createProductValidator from '../validators/createProductValidator';
import deleteProductValidator from '../validators/deleteProductValidator';
import showProductValidator from '../validators/showProductValidator';
import updateProductValidator from '../validators/updateProductValidator';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', isAuthenticated, productsController.index);

productsRouter.get('/:id', isAuthenticated, showProductValidator, productsController.show);

productsRouter.post('/', createProductValidator, isAuthenticated, productsController.create);

productsRouter.put('/:id', updateProductValidator, isAuthenticated, productsController.update);

productsRouter.delete('/:id', deleteProductValidator, isAuthenticated, productsController.delete);

export default productsRouter;
