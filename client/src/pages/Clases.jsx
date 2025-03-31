import styled from "styled-components";
import { ModalUsr } from "../components/Modal";
import { TablaClases } from "../components/Tablas";

export function Clases() {
  return (
    <Container>
      <h1>Clases</h1>
      <div className="flex flex-wrap gap-2 mb-1">
        <ModalUsr />
      </div>
      <TablaClases />
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
