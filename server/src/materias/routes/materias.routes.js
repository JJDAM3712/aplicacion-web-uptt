import { Router } from "express";

import { getMaterias, getMateriaById, postMaterias, putMaterias, deleteMaterias } from "../controllers/materias.controller.js";


const router = Router();

router.get('/materias', getMaterias);
router.get('/materias/:id', getMateriaById);
router.post('/materias', postMaterias);
router.put('/materias/:id', putMaterias);
router.delete('/materias/:id', deleteMaterias);

export default router;