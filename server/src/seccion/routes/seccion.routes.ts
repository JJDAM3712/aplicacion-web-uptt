import { Router } from "express";
import SeccionController from "../controllers/seccion.controller";

const router = Router();

router.get('/seccion', SeccionController.getSeccion);
router.get('/seccion/:id', SeccionController.getSeccionById);
router.post('/seccion', SeccionController.postSeccion);
router.put('/seccion/:id', SeccionController.putSeccion);
router.delete('/seccion/:id', SeccionController.deleteSeccion);

export default router;