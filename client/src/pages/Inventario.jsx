import styled from "styled-components";
import { Button, TextInput } from "flowbite-react";
import { RegisInv } from "../components/Modal";
import { HiOutlineArrowRight } from "react-icons/hi";
import { TablaInv } from "../components/Tablas";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import socketIOClient from 'socket.io-client';
import { ServidorURL } from "../config/config";
import { Buscador } from "../components/buscador";

export function Inventario() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ServidorURL);

    socket.on('ActualizatTable', (nuevasAsistencias) => {
      setDatos(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    ShowDepart();
  }, []);

  const ShowDepart = async () => {
    const res = await axios.get(`${ServidorURL}/inventary`);
    setDatos(res.data);
  };
  const TablaInvent = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: TablaInvent.current,
    filename: 'Notas',
    sheet: 'Hoja 1'
  });

  return (
    <Container>
      <h1>Notas</h1>
      <div className="flex flex-wrap gap-2 mb-1" >
        <RegisInv /> 
        <Button color="success" onClick={onDownload}>
          Generar Reporte
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button color="warning">
          Guardar Notas
        </Button>
        <Buscador />
        {/* --- tabla  */}
      </div>
      <TablaInv  innerRef={TablaInvent} datos={datos} setDatos={setDatos}/>
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
