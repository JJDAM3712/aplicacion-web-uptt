import { Router } from "express";
import AnnoController from "../controllers/anno.controller";

const router = Router();

// rutas de año
router.get('/anno', AnnoController.getController);
router.get('/anno/:id', AnnoController.getControllerById);

export default router;