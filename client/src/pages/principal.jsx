import React from "react";
import styled from "styled-components";
import logo from "../assets/img/fachada.jpg"

export function HomePage() {
  return (
    <Container>
        <BackgroundImage src={logo} alt="Fachada del edificio" />
      <Header>
        <LoginButton>Inicio de Sesión</LoginButton>
      </Header>
      <Main>
        <Section>
          <h2>Reseña Historica</h2>
          <p>
          El 1ro. De Octubre de 1.971, el Ciclo Básico “Monseñor Dr. Estanislao Carrillo 
          “ fue fundado en las viejas instalaciones donde funcionaba el Colegio Privado “ Cecilio Acosta”, 
          ubicado, en el sector la Llanada de Carvajal y cuyo propietario era, el Prof. Canelón Cestari.
          Para esa época, la Dirección del Plantel estaba bajo la responsabilidad del Prof. Rodolfo Enrique Moreno Matheus, 
          quien junto a un grupo de personeros de la Comunidad, convoca al personal directivo, docente,
         administrativo y obrero, para iniciar el proceso de inscripción y organización del Plantel.
         Se logran apertura diez (10) secciones del primer año del Ciclo Básico Común y en los sucesivos 
         períodos 72-73, 73-74 y 74-75, continua la prosecución del 2do y 3er año del Ciclo Básico Común. 
         En esos tiempos, al egresar los alumnos del Básico debían emigrar hacia los Liceos de Valera para 
         continuar y culminar sus estudios de Bachillerato o sencillamente, era la circunstancia precisa para 
         abortar un significativo número de alumnos del sistema escolar regular.
         Del Personal Fundador, se recuerda como forjadores de destinos y constructores de sueños, 
         a nuestros bien amados Profesores: Alves Pachano Rivera, Gladys de Muller, Cristóbal Rivas, Romer Zambrano, 
         Consuelo Juárez, Aura Estela de Durán, Gilberto Cáceres, Luis Rangel, Orlando y Carlos Briceño.
         Y, entre los Obreros, aún encontramos, en el presente 2003, al Sr. Victor Peña. Efectivamente fue, 
         a partir de Marzo de 1973, que la comunidad entera, logra que la Gobernación del Estado 
         y el Ministerio de Desarrollo Urbano (MINDUR), presupuestaran la nueva sede que garantizará a la población 
         de Carvajal, que sus hijos lograrían obtener el Título de Bachiller, en su propio lugar natal.
          </p>
        </Section>
        <Section>
          <h2>Vision</h2>
          <p>
          Capacitar Técnicos Medios en las menciones de Registros y Estadísticas de Salud, 
          Informática y Promoción Social en Deporte y Recreación, requeridos por el área comercial
          y de servicios administrativos que obtengan los conocimientos y competencias necesarias
          para incorporarse al mercado ocupacional y así satisfacer las exigencias del sector productivo 
          y social de la región y el país.
          </p>
          <h2>Mision</h2>
          <p>
          La misión de la Institución se orienta en los siguientes principios:
          ❖ La Educación debe ser considerada como un derecho de todo ciudadano.
          ❖ Debe aportar iguales oportunidades.
          ❖ Integrar a la familia y la comunidad en el proceso educativo.
          ❖ Aceptar las diferencias individuales.
          ❖ Promover la ejecución de proyectos que integren a la comunidad.
          ❖ Fomentar el sentido de responsabilidad, cooperativismo, solidaridad y buenas relaciones dentro y fuera de la institución.
          ❖ Promover la participación de las fuerzas vivas de la localidad y la región en la solución de problemas de índole comunitaria que coadyuven al mejoramiento y a la calidad.
          </p>
        </Section>
      </Main>
    </Container>
  );
}



const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  }
`;
const BackgroundImage = styled.img`
/* Fondo con imagen */
   background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Capa de opacidad */
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Ajusta el nivel de opacidad */
    z-index: -1; /* Coloca la capa detrás del contenido */
`;
const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #1c204b;
`;

const LoginButton = styled.button`
  background-color: #bbc0ff;
  color: #1c204b;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: hsl(195, 74%, 62%);
    color: #fff;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  gap: 20px;
`;

const Section = styled.section`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #1c204b;
  }

  p {
    color: #333;
  }
`;