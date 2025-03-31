import { Router } from "express";
import MencionController from "../controllers/mencion.controller";

const router = Router();

// rutas de mencion
router.get('/mencion', MencionController.getController);
router.get('/mencion/:id', MencionController.getControllerById);
router.post('/mencion', MencionController.postController);
router.put('/mencion/:id', MencionController.putController);
router.delete('/mencion/:id', MencionController.deleteController);

export default router;