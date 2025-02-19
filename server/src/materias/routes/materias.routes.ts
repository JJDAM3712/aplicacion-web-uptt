import { Router } from "express";
import MateriaController from "../controllers/materias.controller";

const router = Router();

router.get('/materias', MateriaController.getMaterias);
router.get('/materias/:id', MateriaController.getMateriaById);
router.post('/materias', MateriaController.postMaterias);
router.put('/materias/:id', MateriaController.putMaterias);
router.delete('/materias/:id', MateriaController.deleteMaterias);

export default router;