import { Router } from "express";
import lapsoController from "../controller/lapso.controller";

const router = Router();

// rutas de lapsps
router.get("/lapso", lapsoController.getController);
router.get("/lapso/:id", lapsoController.getControllerById);

export default router;