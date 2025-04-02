import { Router } from "express";

// importando rutas
import materiasRoutes from "../modules/materias/routes/materias.routes";
import notasRoutes from "../modules/notas/routes/notas.routes";
import estudiantesRoutes from "../modules/Estudiantes/routes/estudiante.routes";
import profesorRoutes from "../modules/profesor/router/profesor.routes";
import userRoutes from "../modules/usuarios/router/user.routes";
import sessionRoutes from "../modules/session/routes/session.routes";
import mencionRoutes from "../modules/mencion/routes/mencion.routes";
import yearRoutes from "../modules/anno/routes/anno.routes";
import lapsoRourtes from "../modules/lapso/routes/lapso.routes";
import evaluacionRoutes from "../modules/evaluacion/routes/evaluacion.routes";

const router = Router();

// rutas
const rutas = [
    materiasRoutes, 
    notasRoutes, 
    estudiantesRoutes, 
    profesorRoutes, 
    userRoutes, 
    sessionRoutes,
    mencionRoutes,
    yearRoutes,
    lapsoRourtes,
    evaluacionRoutes
];

router.use("/api", rutas);

export default router;