import { Router } from "express";

// importando rutas
import materiasRoutes from "../materias/routes/materias.routes";
import notasRoutes from "../notas/routes/notas.routes";

const router = Router();

// rutas
const rutas = [materiasRoutes, notasRoutes];

router.use("/api", rutas);

export default router;