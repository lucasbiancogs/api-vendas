import { Router } from "express";
import SessionController from "../controllers/SessionController";
import createSessionValidator from "../validators/createSessionValidator";

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', createSessionValidator, sessionController.create);

export default sessionRouter;
