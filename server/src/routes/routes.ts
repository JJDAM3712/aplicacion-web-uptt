import { Router } from "express";

// importando rutas
<<<<<<< HEAD
import materiasRoutes from "../materias/routes/materias.routes";
import notasRoutes from "../notas/routes/notas.routes";
import mensionRoutes from "../mension/routes/mension.routes";
import seccionRoutes from "../seccion/routes/seccion.routes";
=======
import materiasRoutes from "../modules/materias/routes/materias.routes";
import notasRoutes from "../modules/notas/routes/notas.routes";
import estudiantesRoutes from "../modules/Estudiantes/routes/estudiante.routes";
import profesorRoutes from "../modules/profesor/router/profesor.routes";
import userRoutes from "../modules/usuarios/router/user.routes";
import sessionRoutes from "../modules/session/routes/session.routes";
import mencionRoutes from "../modules/mencion/routes/mencion.routes";
>>>>>>> feature1

const router = Router();

// rutas
<<<<<<< HEAD
const rutas = [materiasRoutes, notasRoutes, mensionRoutes,seccionRoutes];
=======
const rutas = [materiasRoutes, notasRoutes, estudiantesRoutes, profesorRoutes, userRoutes, sessionRoutes, mencionRoutes];
>>>>>>> feature1

router.use("/api", rutas);

export default router;