import styled from "styled-components";
import { Button } from "flowbite-react";
import { useContext, useRef, useState, useEffect, Suspense } from "react";
import { ThemeContext } from "../App";
import { ModalRegis } from "../components/Modal";
import { TablaProfesores } from "../components/Tablas";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useDownloadExcel } from 'react-export-table-to-excel';
import axios from "axios";
import socketIOClient from 'socket.io-client';
import { ServidorURL } from "../config/config";
import { Buscador } from "../components/buscador";


export const Profesores = () => {
  // optener datos del personal
  // Mover la lógica de obtener los datos a este componente
  const [datos, setDatos] = useState([]);
  const [filteredData, setFilteredData] = useState(datos);

  useEffect(() => {
    ShowProfesores();
    
    const socket = socketIOClient(`http://localhost:4000`, {
        path: '/api/socket.io'
    });

    socket.on('ActualizarTable', (nuevasAsistencias) => {
      setDatos(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const ShowProfesores = async () => {
    const res = await axios.get(`${ServidorURL}/profesor`);
    setDatos(res.data);
    setFilteredData(res.data);
  }
  const TablaPers = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: TablaPers.current,
    filename: 'Profesores',
    sheet: 'Hoja 1'
  });

  return (
    <Container>
      <h1>Profesores</h1>
      <div className="flex flex-wrap gap-2 mb-1">
        <ModalRegis />
        {/* --- exportar excel */}
          <Button color="success" onClick={onDownload}>
            Generar Reporte
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Buscador data={datos} onSearch={setFilteredData}/>
        {/* --- tabla personal */}
      </div>
      <Suspense fallback={<div>Cargando...</div>}>
        <TablaProfesores innerRef={TablaPers} datos={filteredData}/>
      </Suspense>
      
    </Container>
  );
}
const Container = styled.div`
    margin: 1.1rem;
    .ContenedorTabla{
      overflow-x-auto;
      border-radius: 10px;
      background: ${(props) => props.theme.bg2};
      border: 1px solid  ${(props) => props.theme.gray600};
      padding: 0.3rem;
    }
`;
