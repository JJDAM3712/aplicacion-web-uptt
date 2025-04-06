import styled from "styled-components";
import { ModalMateria } from "../components/Modal";
import { TablaMaterias } from "../components/Tablas";

export function Materias() {
  return (
    <Container>
      <h1>Materias</h1>
      <div className="flex flex-wrap gap-2 mb-1 uppercase">
        <ModalMateria />
      </div>
      <TablaMaterias />
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
