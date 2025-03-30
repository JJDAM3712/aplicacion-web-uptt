import { Router } from "express";
import SeccionController from "../controller/seccion.controller";

const router = Router();

router.get('/seccion', SeccionController.getController);
router.get('/seccion/:id', SeccionController.getControllerById);
router.post('/seccion', SeccionController.postController);
router.put('/seccion/:id', SeccionController.putController);
router.delete('/seccion/:id', SeccionController.deleteController);

export default router;