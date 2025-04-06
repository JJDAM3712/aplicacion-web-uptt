import styled from "styled-components";
import { ModalClases } from "../components/Modal";
import { TablaClases } from "../components/Tablas";

export function Clases() {
  return (
    <Container>
      <h1>Clases</h1>
      <div className="flex flex-wrap gap-2 mb-1">
        <ModalClases />
      </div>
      <TablaClases />
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
