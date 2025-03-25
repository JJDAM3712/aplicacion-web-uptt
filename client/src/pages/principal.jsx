import React from "react";
import logo from "../assets/img/fachada.jpg"
import "../css/principal.css"
import logot from "../assets/img/logo.jpg"

export function HomePage() {
  return (
    <div className="container">
      <header className="header">
        <img src={logot} />
        <h1 className="titulo-h1">Escuela Técnica “Monseñor Estanislao Carrillo”</h1>
        <button className="login-button">Inicio de Sesión</button>
      </header>
      <img
        className="background-image"
        src={logo}
        alt="Fachada del edificio"
      />
      <main className="main">
        <section className="section">
          <h2>Reseña Historica</h2>
          <p>
            El 1ro. De Octubre de 1.971, el Ciclo Básico “Monseñor Dr. Estanislao
            Carrillo “ fue fundado en las viejas instalaciones donde funcionaba el
            Colegio Privado “ Cecilio Acosta”...
          </p>
        </section>
        <section className="section">
          <h2>Vision</h2>
          <p>
            Capacitar Técnicos Medios en las menciones de Registros y Estadísticas
            de Salud...
          </p>
          <h2>Mision</h2>
          <p>
            La misión de la Institución se orienta en los siguientes principios...
          </p>
        </section>
      </main>
    </div>
  );
}
