import { Router } from "express";

// importando rutas
import materiasRoutes from "../modules/materias/routes/materias.routes";
import notasRoutes from "../modules/notas/routes/notas.routes";
import estudiantesRoutes from "../modules/Estudiantes/routes/estudiante.routes";
import profesorRoutes from "../modules/profesor/router/profesor.routes";
import userRoutes from "../modules/usuarios/router/user.routes";
import sessionRoutes from "../modules/session/routes/session.routes";
import annoRoutes from "../modules/anno/routes/anno.routes";

const router = Router();

// rutas
const rutas = [materiasRoutes, notasRoutes, profesorRoutes, userRoutes, sessionRoutes, estudiantesRoutes, annoRoutes];

router.use("/api", rutas);

export default router;