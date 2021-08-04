import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import { UsersController } from '../controllers/UserController';
import { isAuthenticated } from '../../../shared/middlewares/isAuthenticated';
import { createUserValidator } from '../validators/createUserValidator';
import { UsersAvatarController } from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/', createUserValidator, usersController.create);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export { usersRouter };
