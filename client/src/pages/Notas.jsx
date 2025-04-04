import styled from "styled-components";
import { Button, TextInput } from "flowbite-react";
import { RegisNotas, ModalClases, FiltrarClases } from "../components/Modal";
import { HiOutlineArrowRight } from "react-icons/hi";
import { TablaNotas } from "../components/Tablas";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import socketIOClient from 'socket.io-client';
import { ServidorURL } from "../config/config";
import { Buscador } from "../components/buscador";
import "../css/st.css";

export function Notas() {
  const [datos, setDatos] = useState([]);
  const [datosLapso, setDatosLapso] = useState({
    id_lapso: "Seleccionar:"
  });
  const [dataLap, setDataLap] = useState([]);
  
  useEffect(() => {
    const ShowLapso = async () => {
      await axios
        .get(`${ServidorURL}/lapso`)
        .then((res) => {
          console.log(res.data.result);
          setDataLap(res.data.result);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    
    ShowLapso();
    ShowDepart();
    const socket = socketIOClient(ServidorURL);

    socket.on('ActualizatTable', (nuevasAsistencias) => {
      setDatos(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
    
  }, []);

  const ShowDepart = async () => {
    const res = await axios.get(`${ServidorURL}/estudiantes`);
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
        <FiltrarClases />
        <select 
          id="id_lapso"
          name="id_lapso"
          value={datosLapso.id_lapso}
          onChange={(e) => setDatosLapso({ id_lapso: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="Seleccionar:" disabled>Seleccionar:</option>
          {dataLap.map((lapsos) => (
            <option 
              value={lapsos.id_lapso}
              key={lapsos.id_lapso}
            >
              {lapsos.lapso}
            </option>
          ))}
          
        </select>
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
      <TablaNotas  innerRef={TablaInvent} datos={datos} setDatos={setDatos}/>
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
