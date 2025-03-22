import styled from "styled-components";
import "../css/App.css";
import logo from "../assets/img/logo.jpg"


export function Home() {  
  return (
    <Container>
        <img src={logo} alt="" />
    </Container>
  );
}


const Container = styled.div`
  margin: 1.1rem;
  hr {
    border: none;
    height: 1px;
    background-color: #fff; /* establece el color de la linea */
  }
`;
