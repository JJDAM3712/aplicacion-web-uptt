import { Router } from "express";
import estudianteController from "../controllers/estudiante.controller";

const router = Router();

// rutas de estudiante
router.get('/estudiantes', estudianteController.getController);
router.get('/estudiantes/:id', estudianteController.getControllerById);

export default router;