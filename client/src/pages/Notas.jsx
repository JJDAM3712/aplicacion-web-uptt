import styled from "styled-components";
import { Button, Label } from "flowbite-react";
import { FiltrarClases } from "../components/Modal";
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
        const [profRes, lapRes, evalRes, estRes] = await Promise.all([
          axios.get(`${ServidorURL}/profesor`),
          axios.get(`${ServidorURL}/lapso`),
          axios.get(`${ServidorURL}/evaluacion`),
          axios.get(`${ServidorURL}/estudiantes`)
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
      }); // Reset filtered data if no subject selected
    }
  }, [materia, dataClases]);

  useEffect(() => {
    console.log("Clases asociadas al profesor seleccionado:", dataClases.clases);
  }, [dataClases]);

  const guardarNotas = async () => {
    const alumnosModificados = notasAlumnos.filter((alumno) => alumno.modificadas);

    if (!datosLapso.id_lapso || !datosLapso.id_evaluacion || !materia) {
      alert(
        "Datos incompletos",
        "Debe seleccionar un lapso, evaluación y materia antes de guardar las notas.",
        "error"
      );
      return;
    }
    try {
      for (const alumno of notasAlumnos) {
        const datosNota = alumno.notas.map((nota, index) => ({
          nota,
          estudiante: alumno.id_estudiante,
          id_clase: dataClases.clases.find(clase => clase.id_materias === parseInt(materia))?.id_clase,
          evaluacion: datosLapso.id_evaluacion,
          id_lapso: datosLapso.id_lapso,
        }));

        for (const nota of datosNota) {
          await axios.post(`${ServidorURL}/notas`, nota);
        }
      }
      alert(
        "Notas registradas",
        "Las notas han sido registradas exitosamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al guardar notas:", error);
      alert(
        "Problema al registrar",
        "Hubo un error al guardar las notas.",
        "error"
      );
    }
  };

  // Función para manejar el filtro desde el componente FiltrarClases
  const manejarFiltro = (filtrosAplicados) => {
    setDatosFiltrados(filtrosAplicados);
  };
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
        <Button color="warning" onClick={guardarNotas}>
          Guardar Notas
        </Button>
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
