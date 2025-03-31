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
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Apellido</Table.HeadCell>
            <Table.HeadCell>Cedula</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>Correo</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y uppercase">
              <Table.Row className="bg-white">
              <Table.Cell><CheckboxVeri /></Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  Juan
                </Table.Cell>
                <Table.Cell>Matos</Table.Cell>
                <Table.Cell>11329525</Table.Cell>
                <Table.Cell>04120268520</Table.Cell>
                <Table.Cell>a@a</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarProfesor />
                    <EliminarProfesor />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
           
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
  //const currentItems = datos.slice(indexOfFirstItem, indexOfLastItem);

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
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Apellido</Table.HeadCell>
            <Table.HeadCell>Cedula</Table.HeadCell>
            <Table.HeadCell>Año</Table.HeadCell>
            <Table.HeadCell>Sección</Table.HeadCell>
            <Table.HeadCell>Mencion</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y uppercase">
            {/* mostrar los datos */}
              <Table.Row className="bg-white">
                <Table.Cell><CheckboxVeri /></Table.Cell>
                <Table.Cell className="whitespace-nowrap">juanito</Table.Cell>
                <Table.Cell>perez</Table.Cell>
                <Table.Cell>1234567</Table.Cell>
                <Table.Cell>2do</Table.Cell>
                <Table.Cell>C</Table.Cell>
                <Table.Cell>informatica</Table.Cell>
                <Table.Cell>
                <Button.Group>
                    <EliminaEstudiante />
                </Button.Group>
                </Table.Cell>
              </Table.Row>
          </Table.Body>
        </Table>
        <Pagination
          itemsPerPage={itemsPerPage}
          //totalItems={datos.length}
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
    const res = await axios.get(`${ServidorURL}/signup`);
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
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap">juan</Table.Cell>
                <Table.Cell>Matematica</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>A</Table.Cell>
                <Table.Cell>Telematica</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarClases />
                    <EliminarClases />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
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
    ShowCategoria();
    const socket = socketIOClient(ServidorURL);

    socket.on('ActualizatTable', (nuevasAsistencias) => {
      setData(nuevasAsistencias);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  const ShowCategoria = async () => {
    const res = await axios.get(`${ServidorURL}/categoria`);
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
            {currentItems.map((categorias) => (
              // eslint-disable-next-line react/jsx-key
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap">
                  {categorias.categoria}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <EditarMencion id={categorias.id_categoria} />
                    <EliminarMencion
                      className="left-4"
                      id={categorias.id_categoria}
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

const Container = styled.div`
  .ContenedorTabla {
    margin-top: 1rem;
    border-radius: 10px;
    background: ${(props) => props.theme.bg2};
    border: 1px solid ${(props) => props.theme.gray600};
    padding: 0.3rem;
  }
`;
