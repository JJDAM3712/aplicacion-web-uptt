import styled from "styled-components";
import { Table, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import React from "react";
import CheckboxVeri from "./checkbox";
import axios from "axios";
import {
  EditarProfesor,
  EliminarProfesor,
  EliminaEstudiante,
  EliminaVisita,
  EliminarMateria,
  EliminarCargo,
  EliminarNotas,
  EliminarClases,
  EditarClases,
  EditarMateria,
  EliminarMencion,
  EditarMencion,
  EditarEstudiante,
  EditarEvaluacion,
  EliminarEvaluacion

} from "./Modal"; //Importamos las Modales para su uso en los Botones de Opciones
import socketIOClient from 'socket.io-client';
import Pagination from "./Pagination";
import { ServidorURL } from "../config/config";

//-------------------------------------------------
// tabla profesores
export function TablaProfesores({ innerRef, datos }) {
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10;

  // Calcula los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla">
        <h1>Profesores:</h1>
        <Table ref={innerRef}>
          <Table.Head className="border-b-2 uppercase">
            <Table.HeadCell>Activar</Table.HeadCell>
            <Table.HeadCell>Cedula</Table.HeadCell>
            <Table.HeadCell>Nombres</Table.HeadCell>
            <Table.HeadCell>Apellidos</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>Correo</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y uppercase">
            {currentItems.map((profesores) => (
              <Table.Row 
                className="bg-white"
                key={profesores.id_usuario}
              >
              <Table.Cell>
                <CheckboxVeri id={profesores.id_usuario}/>
              </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  {profesores.cedula}
                </Table.Cell>
                <Table.Cell>
                  {[profesores.p_nombre, " ",profesores.s_nombre]}
                </Table.Cell>
                <Table.Cell>
                  {[profesores.p_apellido," " ,profesores.s_apellido]}
                </Table.Cell>
                <Table.Cell>{profesores.telefono}</Table.Cell>
                <Table.Cell>{profesores.email}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarProfesor id={profesores.id_usuario}/>
                    <EliminarProfesor id={profesores.id_usuario}/>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={datos.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}
//-------------------------------------------------
// tabla estudiantes
export function TablaEstudiantes({innerRef, datos}) {
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 
  // Calcula los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla">
        <h1>Estudiantes:</h1>
        <Table>
          <Table.Head className="border-b-2 uppercase">
            <Table.HeadCell>Activar</Table.HeadCell>
            <Table.HeadCell>Cedula</Table.HeadCell>
            <Table.HeadCell>Nombres</Table.HeadCell>
            <Table.HeadCell>Apellidos</Table.HeadCell>
            <Table.HeadCell>Telefono</Table.HeadCell>
            <Table.HeadCell>Correo</Table.HeadCell>
            <Table.HeadCell>Año</Table.HeadCell>
            <Table.HeadCell>Sección</Table.HeadCell>
            <Table.HeadCell>Mencion</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y uppercase">
            {/* mostrar los datos */}
            {currentItems.map((estudiantes) => (
              <Table.Row 
                className="bg-white"
                key={estudiantes.id_usuario}
              >
                <Table.Cell>
                  <CheckboxVeri id={estudiantes.id_usuario}/>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {estudiantes.cedula}
                </Table.Cell>
                <Table.Cell>
                  {[estudiantes.p_nombre, " ", estudiantes.s_nombre]}
                </Table.Cell>
                <Table.Cell>
                  {[estudiantes.p_apellido, " ", estudiantes.s_apellido]}
                </Table.Cell>
                <Table.Cell>
                  {estudiantes.telefono}
                </Table.Cell>
                <Table.Cell>
                  {estudiantes.email}
                </Table.Cell>
                <Table.Cell>
                  {estudiantes.anno}
                </Table.Cell>
                <Table.Cell>
                  {estudiantes.seccion}
                </Table.Cell>
                <Table.Cell>
                  {estudiantes.mension}
                </Table.Cell>
                <Table.Cell>
                <Button.Group>
                  <EliminaEstudiante id={estudiantes.id_usuario}/>
                </Button.Group>
                </Table.Cell>
              </Table.Row> 
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={datos.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}
//-------------------------------------------------
// tabla de materia
export function TablaMaterias() {
  const [datos, setDatos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage =10; 
  
  useEffect(() => {
    ShowMaterias();
    const socket = socketIOClient(`${ServidorURL}`);

    socket.on('ActualizatTable', (nuevasAsistencias) => {
      setDatos(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const ShowMaterias = async () => {
    const res = await axios.get(`${ServidorURL}/materias`);
    setDatos(res.data);
  };
   // Calcula los elementos que se mostrarán en la página actual
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);
 
  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla ">
        <h1>Materias:</h1>
        <Table className="uppercase">
          <Table.Head className="border-b-2 uppercase">
            <Table.HeadCell>Materia</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {/* mostrar datos de bd en tabla */}
            {currentItems.map((materia) => (
              <Table.Row
                className="bg-white"
                key={materia.id_materia}
              >
                <Table.Cell className="whitespace-nowrap">
                  {materia.materia}
                </Table.Cell>
                <Table.Cell 
                  className="whitespace-nowrap" 
                  style={{
                    width: "100%",
                    maxWidth:"700px", 
                    overflow: "hidden",
                  }}>
                  {materia.descripcion}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarMateria
                      className="left-4"
                      id={materia.id_materia}
                    />
                    <EliminarMateria
                      className="left-4"
                      id={materia.id_materia}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={datos.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}
//-------------------------------------------------
// tabla de notas
export function TablaNotas({ innerRef, datos }) {
  const [alumnos, setAlumnos] = useState([
    { id: 1, nombre: "Juan", apellido: "Perez", nota1: "0", nota2: "0", nota3: "0", nota4: "0" },
    { id: 2, nombre: "María", apellido: "Gonzales", nota1: "0", nota2: "0", nota3: "0", nota4: "0" },
    { id: 3, nombre: "Carlos", apellido: "Yonson", nota1: "0", nota2: "0", nota3: "0", nota4: "0" },
  ])
  // editar datos en la tabla
  const [editando, setEditando] = useState(null);

  const manejarCambio = (id, valor) => {
    const nuevosAlumnos = alumnos.map((alumno) =>
      alumno.id === id ? { ...alumno, nota1: valor } : alumno,
      alumno.id === id ? { ...alumno, nota2: valor } : alumno,
      alumno.id === id ? { ...alumno, nota3: valor } : alumno,
      alumno.id === id ? { ...alumno, nota4: valor } : alumno
    );
    setAlumnos(nuevosAlumnos);
  };

  const manejarDobleClick = (id) => {
    setEditando(id);
  };

  const manejarGuardar = () => {
    setEditando(null);
  };


  // paginacion de la tabla
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 
  // Calcula los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla">
        <h1>Notas:</h1>
        <Table className="uppercase" ref={innerRef}>
          <Table.Head className="border-b-2">
            <Table.HeadCell>Cedula</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Apellido</Table.HeadCell>
            <Table.HeadCell>1er Nota</Table.HeadCell>
            <Table.HeadCell>2da Nota</Table.HeadCell>
            <Table.HeadCell>3er Nota</Table.HeadCell>
            <Table.HeadCell>4ta Nota</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {alumnos.map((alumno) => (
              <Table.Row className="bg-white" key={alumno.id}>
                <Table.Cell className="whitespace-nowrap">{alumno.id}</Table.Cell>
                <Table.Cell>{alumno.nombre}</Table.Cell>
                <Table.Cell>{alumno.apellido}</Table.Cell>

                <Table.Cell>
                  {editando === alumno.id ? (
                      <TextInput 
                        type="number"
                        value={alumno.nota1}
                        onChange={(e) => manejarCambio(alumno.id, e.target.value)}
                        style={{
                          cursor: "pointer"
                        }}
                      />
                    ) : (
                      <span onDoubleClick={() => manejarDobleClick(alumno.id)} style={{
                        cursor: "pointer"
                      }}>
                        {alumno.nota1}
                      </span>
                    )}
                </Table.Cell>

                <Table.Cell>
                    {editando === alumno.id ? (
                      <TextInput 
                        type="number"
                        value={alumno.nota2}
                        onChange={(e) => manejarCambio(alumno.id, e.target.value)}
                        style={{
                          cursor: "pointer"
                        }}
                      />
                    ) : (
                      <span onDoubleClick={() => manejarDobleClick(alumno.id)} style={{
                        cursor: "pointer"
                      }}>
                        {alumno.nota2}
                      </span>
                    )}
                </Table.Cell>
                <Table.Cell>
                    {editando === alumno.id ? (
                      <TextInput 
                        type="number"
                        value={alumno.nota3}
                        onChange={(e) => manejarCambio(alumno.id, e.target.value)}
                        style={{
                          cursor: "pointer"
                        }}
                      />
                    ) : (
                      <span onDoubleClick={() => manejarDobleClick(alumno.id)} style={{
                        cursor: "pointer"
                      }}>
                        {alumno.nota3}
                      </span>
                    )}
                </Table.Cell>
                <Table.Cell>
                    {editando === alumno.id ? (
                      <TextInput 
                        type="number"
                        value={alumno.nota4}
                        onChange={(e) => manejarCambio(alumno.id, e.target.value)}
                        style={{
                          cursor: "pointer"
                        }}
                      />
                    ) : (
                      <span onDoubleClick={() => manejarDobleClick(alumno.id)} style={{
                        cursor: "pointer"
                      }}>
                        {alumno.nota4}
                      </span>
                    )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={datos.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}
//-------------------------------------------------
// tabla de clases
export function TablaClases() {
  const [datos, setDatos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  useEffect(() => {
    ShowClass();
    const socket = socketIOClient(ServidorURL);

    socket.on('ActualizatTable', (nuevasAsistencias) => {
      setDatos(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const ShowClass = async () => {
    const res = await axios.get(`${ServidorURL}/clase`);
    setDatos(res.data);
  };
  // Calcula los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla ">
        <h1>Clases:</h1>
        <Table>
          <Table.Head className="border-b-2">
            <Table.HeadCell>Profesor</Table.HeadCell>
            <Table.HeadCell>Materia</Table.HeadCell>
            <Table.HeadCell>Año</Table.HeadCell>
            <Table.HeadCell>Seccion</Table.HeadCell>
            <Table.HeadCell>Mencion</Table.HeadCell>            
          </Table.Head>
          <Table.Body className="divide-y">
            {datos.map((clases) => (
              <Table.Row 
                className="bg-white"
                key={clases.id_clase}
              >
                <Table.Cell className="whitespace-nowrap">
                  {[clases.cedula, " ",clases.p_nombre," ",clases.p_apellido]}
                </Table.Cell>
                <Table.Cell>
                  {clases.materia}
                </Table.Cell>
                <Table.Cell>
                  {clases.anno}
                </Table.Cell>
                <Table.Cell>
                  {clases.seccion}
                </Table.Cell>
                <Table.Cell>
                  {clases.mension}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarClases id={clases.id_clase}/>
                    <EliminarClases id={clases.id_clase}/>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={datos.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}
//-------------------------------------------------
// tabla de menciones
export function TablaMenciones() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  useEffect(() => {
    ShowMencion();
    const socket = socketIOClient(ServidorURL);

    socket.on('ActualizatTable', (nuevasAsistencias) => {
      setData(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  const ShowMencion = async () => {
    const res = await axios.get(`${ServidorURL}/mencion`);
    setData(res.data);
  };
  // Calcula los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla ">
        <h1>Menciones:</h1>
        <Table className="uppercase">
          <Table.Head className="border-b-2">
            <Table.HeadCell>Nombre de las Menciones</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentItems.map((mencion) => (
              // eslint-disable-next-line react/jsx-key
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap">
                  {mencion.mension}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarMencion id={mencion.id_mension} />
                    <EliminarMencion
                      className="left-4"
                      id={mencion.id_mension}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}
//-------------------------------------------------
// tabla de evaluacion
export function TablaEvaluacion() {
  const [datos, setDatos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  useEffect(() => {
    ShowEvaluacion();
    const socket = socketIOClient(`http://localhost:4000`, {
      path: '/api/socket.io'
    });
    socket.on('connect', () => {
      console.log("Conexión establecida con el servidor");
    });
    
    socket.on('connect_error', (error) => {
      console.error("Error en la conexión:", error);
    });

    socket.on('ActualizarTable', (evaluaciones) => {
      console.log("Datos recibidos del servidor:", evaluaciones);
      setDatos(evaluaciones);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const ShowEvaluacion = async () => {
    const res = await axios.get(`${ServidorURL}/evaluacion`);
    setDatos(res.data);
  };
   // Calcula los elementos que se mostrarán en la página actual
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);
 
  // Función para cambiar la página actual
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <div className="ContenedorTabla ">
        <h1>Evaluacines:</h1>
        <Table className="uppercase">
          <Table.Head className="border-b-2 uppercase">
            <Table.HeadCell>Evaluacion</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {/* mostrar datos de bd en tabla */}
            {currentItems.map((evaluacion) => (
              <Table.Row
                className="bg-white"
                key={evaluacion.id_evaluacion}
              >
                <Table.Cell className="whitespace-nowrap">
                  {evaluacion.evaluacion}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarEvaluacion
                      className="left-4"
                      id={evaluacion.id_evaluacion}
                    />
                    <EliminarEvaluacion
                      className="left-4"
                      id={evaluacion.id_evaluacion}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={datos.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .ContenedorTabla {
    margin-top: 1rem;
    border-radius: 10px;
    background: ${(props) => props.theme.bg2};
    border: 1px solid ${(props) => props.theme.gray600};
    padding: 0.3rem;
  }
`;
