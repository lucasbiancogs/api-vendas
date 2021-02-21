import { Router } from "express";
import UsersController from "../controllers/UserController";
import isAuthenticated from "../middlewares/isAuthenticated";
import createUserValidator from "../validators/createUserValidator";

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', createUserValidator, usersController.create);

export default usersRouter;
