import { Router } from "express";
import ProfesorController from "../controller/profesor.controller"
import userController from "../../usuarios/controller/user.controller";

const router = Router();

// rutas de profesores
router.get("/profesor", ProfesorController.getProfController);
router.get("/profesor/:id", ProfesorController.getProfControllerById);
router.post("/profesor", ProfesorController.postController);
router.put("/profesor/:id", userController.putController);
router.delete("/profesor/:id", ProfesorController.deleteController);

// rutas de las clases
router.get("/clase", ProfesorController.getController);
router.get("/clase/:id", ProfesorController.getControllerById);
router.post("/clase", ProfesorController.postClaseController);
router.put("/clase/:id", ProfesorController.putController);
router.delete("/clase/:id", ProfesorController.deleteClaseController);
router.get("/clase/:id/clases", ProfesorController.filterClassController);

export default router;