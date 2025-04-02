import { Router } from "express";
import ProfesorController from "../controller/profesor.controller"

const router = Router();

// rutas de profesores
router.get("/profesor", ProfesorController.getProfController);
router.get("/profesor/:id", ProfesorController.getProfControllerById);
router.post("/profesor", ProfesorController.postController);
router.put("/profesor/:id", ProfesorController.putController);
router.delete("/profesor/:id", ProfesorController.deleteController);

// rutas de las clases
router.get("/clase", ProfesorController.getController);
router.get("/clase/:id", ProfesorController.getControllerById);
router.post("/clase", ProfesorController.postClaseController);
router.delete("/clase/:id", ProfesorController.deleteClaseController);

export default router;