import { Router, Request, Response } from "express";
import MateriaController from "../controllers/materias.controller";
import { tokenValidate } from "../../session/token/session.token";


const router = Router();

// rutas de materias
router.get('/materias',MateriaController.getController);
router.get('/materias/:id', MateriaController.getControllerById);
router.post('/materias', MateriaController.postController);
router.put('/materias/:id', MateriaController.putController);
router.delete('/materias/:id', MateriaController.deleteController);

export default router;