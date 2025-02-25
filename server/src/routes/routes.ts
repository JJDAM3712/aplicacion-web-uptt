import { Router } from "express";

// importando rutas
import materiasRoutes from "../modules/materias/routes/materias.routes";
import notasRoutes from "../modules/notas/routes/notas.routes";
import estudiantesRoutes from "../modules/Estudiantes/routes/estudiante.routes"

const router = Router();

// rutas
const rutas = [materiasRoutes, notasRoutes, estudiantesRoutes];

router.use("/api", rutas);

export default router;