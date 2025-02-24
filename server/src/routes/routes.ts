import { Router } from "express";

// importando rutas
import materiasRoutes from "../materias/routes/materias.routes";
import notasRoutes from "../notas/routes/notas.routes";
import mensionRoutes from "../mension/routes/mension.routes";
import seccionRoutes from "../seccion/routes/seccion.routes";

const router = Router();

// rutas
const rutas = [materiasRoutes, notasRoutes, mensionRoutes,seccionRoutes];

router.use("/api", rutas);

export default router;