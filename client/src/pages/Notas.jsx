import styled from "styled-components";
import { Button, Label } from "flowbite-react";
import { FiltrarClases, RegistroNotas, EliminarNotas, EliminarNotasClase } from "../components/Modal";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ServidorURL } from "../config/config";
import { TablaNotas } from "../components/Tablas";
import "../css/st.css";
import { useDownloadExcel } from 'react-export-table-to-excel';

export function Notas() {
  const [datos, setDatos] = useState([]);
  const [datosLapso, setDatosLapso] = useState({
    id_lapso: "Seleccionar:",
    id_evaluacion: "Seleccionar:"
  });
  const [materia, setMateria] = useState("Seleccionar:");
  const [profesor, setProfesor] = useState("Seleccionar:");
  const [dataProf, setDataProf] = useState([]);
  const [dataLap, setDataLap] = useState([]);
  const [dataEva, setDataEva] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [dataClases, setDataClases] = useState({
    materias: [],
    menciones: [],
    anio: [],
    secciones: [],
    materias: [],
    clases: []
  });
  const [filteredData, setFilteredData] = useState({
    menciones: [],
    anio: [],
    secciones: []
  });
  const [notasAlumnos, setNotasAlumnos] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profRes, lapRes, evalRes, estRes] = await Promise.all([
          axios.get(`${ServidorURL}/profesor`),
          axios.get(`${ServidorURL}/lapso`),
          axios.get(`${ServidorURL}/evaluacion`),
          axios.get(`${ServidorURL}/estudiantes?`)
        ]);
        setDataProf(profRes.data);
        setDataLap(lapRes.data.result);
        setDataEva(evalRes.data);
        setDatos(estRes.data);
      } catch (error) {
        console.error("Error al obtener datos iniciales:", error);
      }
    };
    
    fetchData();
  }, []);

  const claseSeleccionada = dataClases.clases.find(clase => clase.id_materias === parseInt(materia));
  if (!claseSeleccionada) {
    console.warn("No se encontró una clase válida para la materia seleccionada.");
  }
  // Obtener las clases asociadas al profesor seleccionado
  useEffect(() => {
    if (profesor !== "Seleccionar:") {
      setMateria("Seleccionar:");
      setFilteredData({
        menciones: [],
        anio: [],
        secciones: []
      });
      setDataClases({
        clases: []
      });

      const fetchDetallesClases = async () => {
        try {
          const res = await axios.get(`${ServidorURL}/clases/${profesor}/notas`);
          setDataClases({ clases: res.data.message });
        } catch (error) {
          console.error("Error al obtener detalles de clases:", error);
        }
      };
      fetchDetallesClases();
    }
  }, [profesor]);

  useEffect(() => {
    // Filter sections, years, and mentions based on the selected subject
    if (materia !== "Seleccionar:" && materia) {
      const filteredSecciones = dataClases.clases
        .filter((clase) => clase.id_materias === parseInt(materia)) // Cambia 'id_materias' si es necesario
        .map((clase) => ({
          id_seccion: clase.id_seccion,
          seccion: clase.seccion
        }));

      const filteredAnios = dataClases.clases
        .filter((clase) => clase.id_materias === parseInt(materia))
        .map((clase) => ({
          id_anno: clase.id_anno,
          anno: clase.anno
        }));

      const filteredMenciones = dataClases.clases
        .filter((clase) => clase.id_materias === parseInt(materia))
        .map((clase) => ({
          id_mension: clase.id_mension,
          mension: clase.mension
        }));

      setFilteredData({
        menciones: filteredMenciones,
        anio: filteredAnios,
        secciones: filteredSecciones
      });
      
    } else {
      setFilteredData({
        menciones: [],
        anio: [],
        secciones: []
      });
    }
  }, [materia, dataClases]);

  useEffect(() => {
    if (datosLapso.id_lapso !== "Seleccionar:") {
      console.log("Lapso seleccionado:", datosLapso.id_lapso);
      // Aquí puedes agregar lógica adicional, como cargar datos específicos de ese lapso
    }
  }, [datosLapso.id_lapso]);
  useEffect(() => {
    if (datosLapso.id_evaluacion !== "Seleccionar:") {
      console.log("Lapso seleccionado:", datosLapso.id_evaluacion);
      // Aquí puedes agregar lógica adicional, como cargar datos específicos de ese lapso
    }
  }, [datosLapso.id_evaluacion]);
  
  // Función para manejar el filtro desde el componente FiltrarClases
  const manejarFiltro = (filtrosAplicados) => {
    setDatosFiltrados(filtrosAplicados);
  };
  
  const TablaPers = useRef(null);
  
  const { onDownload } = useDownloadExcel({
    currentTableRef: TablaPers.current,
    filename: `Clase ${claseSeleccionada?.seccion} ${claseSeleccionada?.anno} ${claseSeleccionada?.mension}`,
    sheet: 'Hoja 1'
  });
  
  return (
    <Container>
      <h1>Notas</h1>
      <div className="flex justify-between items-center gap-4 mb-4" >
        <div className="flex flex-wrap gap-4 mb-4">
          {/* SELECT DE PROFESORES */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="profesor" value="Profesor:" />
            <select 
              id="profesor"
              name="profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="Seleccionar:" disabled>Seleccionar:</option>
              {dataProf.map((profesores) => (
                <option 
                  value={profesores.id_usuario}
                  key={profesores.id_usuario}
                >
                  {[
                    profesores.cedula," ",
                    profesores.p_nombre," ",
                    profesores.p_apellido
                  ]}
                </option>
              ))}
              
            </select>
          </div>
          {/* SELECT DE LAPSOS */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="id_lapso" value="Lapso:" />
            <select 
              id="id_lapso"
              name="id_lapso"
              value={datosLapso.id_lapso}
              onChange={(e) => {
                setDatosLapso((prev) => ({ ...prev, id_lapso: e.target.value })); // Actualiza el estado al seleccionar un lapso
              }}
              className="border rounded px-2 py-1"
            >
              <option value="Seleccionar:">Seleccionar:</option>
              {dataLap.map((lapsos) => (
                <option 
                  value={lapsos.id_lapso}
                  key={lapsos.id_lapso}
                >
                  {lapsos.lapso}
                </option>
              ))}
            </select>
          </div>
          {/* SELECT DE EVALUACION */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="id_evaluacion" value="Evaluación:" />
            <select 
              id="id_evaluacion"
              name="id_evaluacion"
              value={datosLapso.id_evaluacion}
              onChange={(e) => {
                setDatosLapso((prev) => ({ ...prev, id_evaluacion: e.target.value }))
              }}
              className="border rounded px-2 py-1"
            >
              <option value="Seleccionar:">Seleccionar:</option>
              {dataEva.map((Evaluacines) => (
                <option 
                  value={Evaluacines.id_evaluacion}
                  key={Evaluacines.id_evaluacion}
                >
                  {Evaluacines.evaluacion}
                </option>
              ))}
            </select>
          </div> 
        </div>
        {/* eliminar notas de la base de datos */}
        <EliminarNotas />
      </div>
      <div className="flex flex-wrap gap-4 mb-4" >
        {/* FILTRO CLASES */}
        <FiltrarClases 
          onFilter={manejarFiltro} 
          dataClases={dataClases}
          filteredData={filteredData}
          materia={materia}
          setMateria={setMateria}
        />
        {datosFiltrados.length === 0 ? (
          <Button disabled color="warning">
            Registrar Nota
          </Button>
        ) : (
          <RegistroNotas 
            estudiantes={datosFiltrados}
            idLapso={datosLapso.id_lapso}
            idEvaluacion={datosLapso.id_evaluacion}
            idClase={claseSeleccionada?.id_clase}
          />
        )}
        {/* --- exportar excel */}
        {datosFiltrados.length === 0 ? (
          <Button disabled color="success">
            Generar Informe
          </Button>
        ) : (
          <Button color="success" onClick={onDownload}>
            Generar Informe
          </Button>
        )}
        {/* ELIMINAR NOTAS DE UNA CLASE Y LAPSO */}
        {datosFiltrados.length === 0 ? (
          <Button disabled color="failure">
            Eliminar Notas
          </Button>
        ) : (
          <EliminarNotasClase
            idLapso={datosLapso.id_lapso}
            idClase={claseSeleccionada?.id_clase}
            datos={datosFiltrados}
            setDatos={setDatosFiltrados}
          />
        )}
        
      </div>
      
      <TablaNotas 
        datos={datosFiltrados}
        setDatos={setDatosFiltrados}
        idLapso={datosLapso.id_lapso}
        idEvaluacion={datosLapso.id_evaluacion}
        idClase={claseSeleccionada?.id_clase}
        onGuardarNotas={setNotasAlumnos}
        innerRef={TablaPers}
      />
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
