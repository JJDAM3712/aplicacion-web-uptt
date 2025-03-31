import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Profesores } from "../pages/Profesores";
import { Estudiantes } from "../pages/Estudiantes";
import { Materias } from "../pages/Materias";
import { Notas } from "../pages/Notas";
import { Clases } from "../pages/Clases";
import { Menciones } from "../pages/Menciones";

// eslint-disable-next-line react-refresh/only-export-components
export const routes = [
  { name: "Home", path: "/", component: Home },
  { name: "Profesores", path: "/profesores", component: Profesores },
  { name: "Estudiantes", path: "/estudiantes", component: Estudiantes },
  { name: "Notas", path: "/notas", component: Notas },
  { name: "Materias", path: "/materias", component: Materias },
  { name: "Clases", path: "/clases", component: Clases },
  { name: "Menciones", path: "/menciones", component: Menciones },
];

export function MyRoutes() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
