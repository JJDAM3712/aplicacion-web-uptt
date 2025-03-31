import styled from "styled-components";
import { TablaEstudiantes } from "../components/Tablas";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Datepicker, Button } from "flowbite-react";
import { RegisEstudiante } from "../components/Modal";
import { HiOutlineArrowRight } from "react-icons/hi";
import socketIOClient from 'socket.io-client';
import { ServidorURL } from "../config/config";
import { Buscador } from "../components/buscador";


export function Estudiantes() {
  return (
    <Container>
      <h1>Estudiantes</h1>
      <Container>

          <form>
            <div className="flex flex-wrap gap-2 mb-1">
              <RegisEstudiante />

              <Button color="success" type="submit">
                Generar Reporte
                <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Buscador />
            </div>
          </form>

      </Container>
      <TablaEstudiantes/>
    </Container>
  );
}

const Container = styled.div`
  margin: 1.1rem;
  .ContRep {
    width: 70%;
    border-radius: 10px;
    background: ${(props) => props.theme.bg2};
    border-top: 3px solid ${(props) => props.theme.red500};
    padding: 0.3rem;
  }
  @media (max-width: 1199px) {
    .ContRep {
      width: 100%;
    }
  }
`;
