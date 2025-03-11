import { Router } from "express";
import ProfesorController from "../controller/profesor.controller"

const router = Router();

// rutas de profesores
router.get("/profesor", ProfesorController.getController);
router.get("/profesor/:id", ProfesorController.getControllerById);
router.post("/profesor", ProfesorController.postController);
router.put("/profesor/:id", ProfesorController.putController);
router.delete("/profesor/:id", ProfesorController.deleteController);

export default router;