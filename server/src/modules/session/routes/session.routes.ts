import { Router } from "express";
import sessionController from "../controller/session.controller";
import sessionService from "../service/session.service";

const router = Router();


// rutas de session
router.patch('/sessionPass/:id', sessionController.passGenerateController);
router.post('/sessionLogin', sessionController.autenticateController);
router.get('/validToken', sessionController.autenticateToken);


export default router;