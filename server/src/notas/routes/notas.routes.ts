import { Router } from "express";
import NotasController from "../controllers/notas.controller";

const router = Router();

router.get('/notas', NotasController.getNotas);
router.get('/notas/:id', NotasController.getNotasById);
router.post('/notas', NotasController.postNotas);
router.put('/notas/:id', NotasController.putNotas);
router.delete('/notas/:id', NotasController.deleteNotas);

export default router;