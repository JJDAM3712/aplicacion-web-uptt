import styled from "styled-components";
import { Button, Label } from "flowbite-react";
import { FiltrarClases, RegistroNotas } from "../components/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { ServidorURL } from "../config/config";
import { Buscador } from "../components/buscador";
import { TablaNotas } from "../components/Tablas";
import { alert } from "../utils/generic";
import "../css/st.css";

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
        const [profRes, lapRes, evalRes, estRes,notRes] = await Promise.all([
          axios.get(`${ServidorURL}/profesor`),
          axios.get(`${ServidorURL}/lapso`),
          axios.get(`${ServidorURL}/evaluacion`),
          axios.get(`${ServidorURL}/estudiantes`),
          axios.get(`${ServidorURL}/notas`)
        ]);
        setDataProf(profRes.data);
        setDataLap(lapRes.data.result);
        setDataEva(evalRes.data);
        setDatos(estRes.data);
        // Combinar estudiantes y notas
        const estudiantesConNotas = estRes.data.map((estudiante) => {
          const notasEstudiante = notRes.data.filter(
            (nota) => parseInt(nota.id_estudiante, 10) === parseInt(estudiante.id_estudiante, 10)
          );
          return {
            ...estudiante,
            notas: notasEstudiante.length > 0
              ? notasEstudiante.map((nota) => ({
                  nota: nota.nota, // Convierte la nota a número
                }))
              : [{ nota: n.notas || "Sin nota" }, { nota: "Sin nota" }, { nota: "Sin nota" }, { nota: "Sin nota" }],
            };
        });

        setDatosFiltrados(estudiantesConNotas);
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

  // Función para manejar el filtro desde el componente FiltrarClases
  const manejarFiltro = (filtrosAplicados) => {
    console.log("Datos recibidos por el padre:", filtrosAplicados);
    setDatosFiltrados(filtrosAplicados);
  };
  const procesarNotas = (data) => {
    return data.map((estudiante) => {
      const notasArray = estudiante.evaluaciones.split(", ").map((evaluacion) => {
        const [evaluacionNombre, nota] = evaluacion.split(" ");
        return { evaluacion: evaluacionNombre, nota: parseInt(nota) }; // Devuelve nota como número
      });
  
      return { ...estudiante, notas: notasArray }; // Agrega las notas procesadas al estudiante
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${ServidorURL}/notas`);
        const estudiantesConNotas = procesarNotas(res.data);
        setDatosFiltrados(estudiantesConNotas); // Actualiza el estado con datos procesados
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <Container>
      <h1>Notas</h1>
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
        <Buscador datos={datos} setDatosFiltrados={setDatosFiltrados} />
      </div>
      <div className="flex flex-wrap gap-4 mb-4" >
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
              setDatosLapso((prev) => ({ ...prev, id_lapso: e.target.value }))
            }}
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
            <option value="Seleccionar:" disabled>Seleccionar:</option>
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
      <TablaNotas 
        datos={datosFiltrados}
        setDatos={setDatosFiltrados}
        idLapso={datosLapso.id_lapso}
        idEvaluacion={datosLapso.id_evaluacion}
        idClase={claseSeleccionada?.id_clase}
        onGuardarNotas={setNotasAlumnos}
      />
    </Container>
  );
}
const Container = styled.div`
  margin: 1.1rem;
`;
