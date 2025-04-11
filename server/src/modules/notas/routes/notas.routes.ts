import { Router } from "express";
import NotasController from "../controllers/notas.controller";

const router = Router();

router.get('/notas', NotasController.getController);
router.get('/notas/:id', NotasController.getControllerById);
router.post('/notas', NotasController.postController);
router.put('/notas/:id', NotasController.putController);
router.delete('/notas', NotasController.deleteController);
router.delete('/notasDelete', NotasController.deleteNotasClase);

export default router;