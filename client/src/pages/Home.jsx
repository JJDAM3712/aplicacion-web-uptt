import styled from "styled-components";
import "../css/App.css";
import logo from "../assets/img/fachada.jpg"


export function Home() {  
  return (
    <Container>
        <BackgroundImage src={logo} alt="Fachada del edificio" />
    </Container>
  );
}


const Container = styled.div`
  width: 80vw; /* Ocupa todo el ancho de la pantalla */
  height: 120vh; /* Ocupa todo el alto de la pantalla */
  position: relative;
  overflow: hidden; /* Garantiza que no haya elementos desbordados */
  margin: 0;
  padding: 0;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Esto asegura que la imagen se recorte para llenar el contenedor */
  margin: 0; /* Elimina cualquier margen alrededor de la imagen */
  border: none; /* Asegúrate de que no haya bordes adicionales */
  padding: 0;
`;

