import styled from "styled-components";
import { ModalMencion } from "../components/Modal";
import { TablaMenciones } from "../components/Tablas";

export function Menciones() {
  return (
    <Container>
      <h1>Menciones</h1>
      <div className="flex flex-wrap gap-2 mb-1">
        <ModalMencion />
      </div>
      <TablaMenciones />
    </Container>
  );
}

const Container = styled.div`
  margin: 1.1rem;
`;
