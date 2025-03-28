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
        <div roundedBox className="roundedBox">
          <h2>Nuestra Historia...</h2>
          <p>El 1ro. De Octubre de 1.971, el Ciclo Básico “Monseñor Dr. Estanislao Carrillo “ fue fundado en las viejas instalaciones donde funcionaba el Colegio Privado “ Cecilio Acosta”, ubicado, en el sector la Llanada de Carvajal y cuyo propietario era, el Prof. Canelón Cestari. Para esa época, la Dirección del Plantel estaba bajo la responsabilidad del Prof. Rodolfo Enrique Moreno Matheus, quien junto a un grupo de personeros de la Comunidad, convoca al personal directivo, docente, administrativo y obrero, para iniciar el proceso de inscripción y organización del Plantel.
            Se logran apertura diez (10) secciones del primer año del Ciclo Básico Común y en los sucesivos períodos 72-73, 73-74 y 74-75, continua la prosecución del 2do y 3er año del Ciclo Básico Común. En esos tiempos, al egresar los alumnos del Básico debían emigrar hacia los Liceos de Valera para continuar y culminar sus estudios de Bachillerato o sencillamente, era la circunstancia precisa para abortar un significativo número de alumnos del sistema escolar regular. 
            Del Personal Fundador, se recuerda como forjadores de destinos y constructores de sueños, a nuestros bien amados Profesores: Alves Pachano Rivera, Gladys de Muller, Cristóbal Rivas, Romer Zambrano, Consuelo Juárez, Aura Estela de Durán, Gilberto Cáceres, Luis Rangel, Orlando y Carlos Briceño. Y, entre los Obreros, aún encontramos, en el presente 2003, al Sr. Victor Peña. Efectivamente fue, a partir de Marzo de 1973, que la comunidad entera, logra que la Gobernación del Estado y el Ministerio de Desarrollo Urbano (MINDUR), presupuestaran la nueva sede que garantizará a la población de Carvajal, que sus hijos lograrían obtener el Título de Bachiller, en su propio lugar natal.
          </p>
          </div>
        </section>
        <section className="section">
        <div className="contentWrapper">
          <div className="roundedBox">
            <h2>Vision</h2>
            <p>
              Formar a los estudiantes de la mención de Deporte y Recreación como personal técnico, capacitado y competente para apoyar el desarrollo de la cultura deportiva y la recreación en las comunidades, asociaciones, institutos u clubes, con el fin de lograr la incorporación de la población a las actividades físicas, creativas y deportivas.
            </p>
            </div>
          <div className="roundedBox">
            <h2>Mision</h2>
            <p>
             Formar a los estudiantes de la mención de Deporte y Recreación como personal técnico, capacitado y competente para apoyar el desarrollo de la cultura deportiva y la recreación en las comunidades, asociaciones, institutos u clubes, con el fin de lograr la incorporación de la población a las actividades físicas, creativas y deportivas.
           </p>
          </div>
        </div>
        </section>
      </main>
    </div>
  );
}
