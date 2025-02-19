import { Router } from "express";
import NotasController from "../controllers/notas.controller";

const router = Router();

router.get('/notas', NotasController.getNotas);

export default router;