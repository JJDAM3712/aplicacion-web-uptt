import { Router } from "express";
import { getNotas } from "../controllers/notas.controller.js";

const router = Router();

router.get('/notas', getNotas);

export default router;