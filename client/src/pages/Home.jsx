import styled from "styled-components";
import logo from "../assets/img/fachada.jpg"


export function Home() {  
  return (
    <Container>
        <BackgroundImage src={logo} alt="Fachada del edificio" />
    </Container>
  );
}


const Container = styled.div`
  width: 100%; /* Ocupa todo el ancho de la pantalla */
  height: 100%; /* Ocupa todo el alto de la pantalla */
  position: relative;
  overflow: hidden; /* Garantiza que no haya elementos desbordados */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para que cubra */
  margin: 0;
  border: none;
  padding: 0;
  box-sizing: border-box; /* Incluye padding y bordes en el tamaño */
`;


