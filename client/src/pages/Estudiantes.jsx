import styled from "styled-components";
import { TablaEstudiantes } from "../components/Tablas";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Datepicker, Button } from "flowbite-react";
import { RegisEstudiante, FiltrarEstudiantes } from "../components/Modal";
import { HiOutlineArrowRight } from "react-icons/hi";
import socketIOClient from 'socket.io-client';
import { ServidorURL } from "../config/config";
import { Buscador } from "../components/buscador";
import { alert } from "../utils/generic";


export function Estudiantes() {
  const [datos, setDatos] = useState([]); // Datos completos de estudiantes
  const [datosFiltrados, setDatosFiltrados] = useState([]); // Datos después de aplicar filtros
  const TablaAlumno = useRef(null);

  // Descargar datos de la tabla a un archivo Excel
  const { onDownload } = useDownloadExcel({
    currentTableRef: TablaAlumno.current,
    filename: "Estudiantes",
    sheet: "Hoja 1",
  });

  // Obtener todos los datos iniciales de estudiantes al cargar
  useEffect(() => {
    setDatosFiltrados([]);
    const fetchDatosEstudiantes = async () => {
      try {
        const res = await axios.get(`${ServidorURL}/estudiantes`);
        setDatos(res.data);
        setDatosFiltrados(res.data); // Inicialmente muestra todos los datos
      } catch (error) {
        console.error("Error al obtener datos de estudiantes:", error);
      }
    };

    fetchDatosEstudiantes();
  }, []);

  // Función para manejar el filtro desde el componente FiltrarClases
  const manejarFiltro = (filtrosAplicados) => {
    if (!filtrosAplicados || filtrosAplicados.length === 0) {
      setDatosFiltrados([]);
      alert("No hay estudiantes!","No se encontraron estudiantes en esta clase.", "warning");
      return;
    }
    setDatosFiltrados(filtrosAplicados || []);
  };

  return (
    <Container>
      <h1>Estudiantes</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Componente de filtro */}
        <FiltrarEstudiantes onFilter={manejarFiltro}/>

        {/* Componente de registro */}
        <RegisEstudiante />

        {/* Botón para generar reporte */}
        <Button color="success" onClick={onDownload}>
          Generar Reporte
        </Button>

        {/* Componente de buscador */}
        <Buscador datos={datos} setDatosFiltrados={setDatosFiltrados} />
      </div>

      {/* Tabla de notas */}
      <TablaEstudiantes innerRef={TablaAlumno} datos={datosFiltrados} setDatos={setDatosFiltrados} />
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
