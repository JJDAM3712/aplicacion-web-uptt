import { Router, Request, Response } from "express";
import EvaluacionController from "../controller/evaluacion.controller";


const router = Router();

// rutas de evaluacion
router.get('/evaluacion',EvaluacionController.getController);
router.get('/evaluacion/:id', EvaluacionController.getControllerById);
router.post('/evaluacion', EvaluacionController.postController);
router.put('/evaluacion/:id', EvaluacionController.putController);
router.delete('/evaluacion/:id', EvaluacionController.deleteController);

export default router;