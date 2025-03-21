import { Router } from "express";

// importando rutas
import materiasRoutes from "../modules/materias/routes/materias.routes";
import notasRoutes from "../modules/notas/routes/notas.routes";
import estudiantesRoutes from "../modules/Estudiantes/routes/estudiante.routes";
import profesorRoutes from "../modules/profesor/router/profesor.routes";
import userRoutes from "../modules/usuarios/router/user.routes";
import email from "../modules/mail/mail.routes";

const router = Router();

// rutas
const rutas = [materiasRoutes, notasRoutes, estudiantesRoutes, profesorRoutes, userRoutes, email];

router.use("/api", rutas);

export default router;