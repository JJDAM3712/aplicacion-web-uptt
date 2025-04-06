import styled from "styled-components";
import { ModalEvaluacion } from "../components/Modal";
import { TablaEvaluacion } from "../components/Tablas";

export function Evaluacion() {
  return (
    <Container>
      <h1>Evaluacion</h1>
      <div className="flex flex-wrap gap-2 mb-1 uppercase">
        <ModalEvaluacion />
      </div>
      <TablaEvaluacion />
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
