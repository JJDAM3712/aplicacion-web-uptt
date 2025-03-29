import { Router } from "express";
import estudianteController from "../controllers/estudiante.controller";

const router = Router();

// rutas de estudiante
router.get('/estudiantes', estudianteController.getController);
router.get('/estudiantes/:id', estudianteController.getControllerById);
router.post('/estudiantes', estudianteController.postController);
router.put('/estudiantes/:id', estudianteController.putController);
router.delete('/estudiantes/:id', estudianteController.deleteController);

export default router;