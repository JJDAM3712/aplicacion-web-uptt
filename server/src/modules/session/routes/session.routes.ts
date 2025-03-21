import { Router } from "express";
import sessionController from "../controller/session.controller";

const router = Router();


// rutas de session
router.patch('/sessionPass/:id', sessionController.passGenerateController);


export default router;