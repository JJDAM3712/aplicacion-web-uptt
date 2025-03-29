import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import { Home } from "../pages/Home";
import { Profesores } from "../pages/Profesores";
import { Estudiantes } from "../pages/Estudiantes";
import { Departamentos } from "../pages/Departamentos";
import { Inventario } from "../pages/Inventario";
import { Usuario } from "../pages/Usuario";
import { Cargos } from "../pages/Cargos";
import { Visitas } from "../pages/Visitas";
import { Categoria } from "../pages/Categoria";
import { Respaldo } from "../pages/Respaldo";

// eslint-disable-next-line react-refresh/only-export-components
export const routes = [
  { name: "Home", path: "/", component: Home },
  { name: "Profesores", path: "/profesores", component: Profesores },
  { name: "Estudiantes", path: "/estudiantes", component: Estudiantes },
  { name: "Visitas", path: "/visitas", component: Visitas },
  { name: "Inventario", path: "/inventario", component: Inventario },
  { name: "Departamentos", path: "/departamentos", component: Departamentos },
  { name: "Cargos", path: "/cargos", component: Cargos },
  { name: "Usuario", path: "/usuario", component: Usuario },
  { name: "Categoria", path: "/categoria", component: Categoria },
  { name: "Respaldo", path: "/respaldo", component: Respaldo },
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
