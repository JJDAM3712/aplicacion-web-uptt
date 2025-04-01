/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import logo from "../assets/img/logo.jpg";
import { Button, Modal, Radio, Label, TextInput, Select } from "flowbite-react";
import { FaEraser, FaEdit } from "react-icons/fa";
import {
  HiOutlineExclamationCircle,
  HiUser,
  HiKey,
  HiPencil,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { alert, PeticionAxios } from "../utils/generic";
import { ServidorURL } from "../config/config";

// ----------------------------------------
// login
export function Login() {
  return (
    <form action="" className="form_main" onSubmit={handleSend}>
            <div className="flex ">
              <img src={logo} alt="Logo CNE" className="w-24" />
            </div>
            <p className="heading">Ingresar al Sistema</p>
            <div className="inputContainer">
              <HiUser className="inputIcon" />
              <input
                type="text"
                className="inputField"
                id="usuario"
                name="usuario"
                value={datos.usuario}
                placeholder="Usuario"
                onChange={handleChange}
              />
            </div>
    
            <div className="inputContainer">
              <HiLockClosed className="inputIcon" />
              <input
                type="password"
                className="inputField"
                id="password"
                name="password"
                value={datos.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
            </div>
    
            <button id="button">Ingresar</button>
            <a className="forgotLink" href="/forgot">
              Olvidó su contraseña?
            </a>
          </form>
  )
}

// registrar profesor
export function ModalRegis() {
  const [openModal, setOpenModal] = useState(false);
  
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)}>Registrar Profesor</Button>
        <Modal
          show={openModal}
          onClose={handleCloseModal}
          position="top-center"
        >
          <Modal.Header>Registrar Profesor</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
            >
               {/*----- cedula ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cedula" value="Cedula:" />
                </div>
                <TextInput
                  id="cedula"
                  name="cedula"
                  type="text"
                  placeholder="1234567890"
                  required
                  shadow
                />
              </div>
              {/*----- primer nombre ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="primer nombre" value="Primer Nombre:" />
                </div>
                <TextInput
                  id="p_nombre"
                  name="p_nombre"
                  type="text"
                  placeholder="Primer Nombre"
                  required
                  shadow
                />
              </div>
                   {/*----- segundo nombre ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="segundo nombre" value="Segundo Nombre:" />
                </div>
                <TextInput
                  id="s_nombre"
                  name="s_nombre"
                  type="text"
                  placeholder="Segundo Nombre"
                  required
                  shadow
                />
              </div>
              {/*----- primer apellido ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="primer apellido" value="Primer Apellido:" />
                </div>
                <TextInput
                  id="p_apellido"
                  name="p_apellido"
                  type="text"
                  placeholder="Primer Apellido"
                  required
                  shadow
                />
              </div>
               {/*----- segundo apellido ------- */}
               <div>
                <div className="mb-2 block">
                  <Label htmlFor="segundo apelldio" value="Segundo Apellido:" />
                </div>
                <TextInput
                  id="s_apellido"
                  name="s_apellido"
                  type="text"
                  placeholder="Segundo Apellido"
                  required
                  shadow
                />
              </div>
              {/*----- telefono ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="telefono" value="Teléfono:" />
                </div>
                <TextInput
                  id="telefono"
                  name="telefono"
                  type="text"
                  placeholder="Teléfono"
                  required
                  shadow
                />
              </div>
              {/*----- correo ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="correo" value="Correo:" />
                </div>
                <TextInput
                  id="correo"
                  name="correo"
                  type="text"
                  placeholder="correo"
                  required
                  shadow
                />
              </div>
              <Button type="submit">Registrar Profesor</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
export function EditarProfesor({ id }) {
  const [openModal, setOpenModal] = useState(false);
  // mostrar apartamentos en select
  const [datosDep, setDatosDep] = useState([]);
  //--------------------------------
  // mostrar categorias en select
  const [datosCat, setDatosCat] = useState([]);

  useEffect(() => {
    const ShowDepart = async () => {
      await axios
        .get(`${ServidorURL}/task`)
        .then((res) => {
          console.log(res);
          setDatosDep(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const ShowCat = async () => {
      await axios
        .get(`${ServidorURL}/cargos`)
        .then((res) => {
          console.log(res);
          setDatosCat(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowDepart();
    ShowCat();
  }, []);
  //---------------------------------

  //---------------------------------
  // regsitrar datos
  const [datos, setDatos] = useState({
    cedula: "",
    p_nombre: "",
    s_nombre: "",
    p_apellido: "",
    s_apellido: "",
    telefono: "",
    email: "",
  });

  // capturar eventos de inputs
  const handleChange = (e) => {
    let names = e.target.name;
    let values = e.target.value.toUpperCase();
    if (names === "cedula" || names === "telefono") {
      values = values.replace(/[^0-9]/g, ""); // Esto eliminará cualquier caracter que no sea un dígito
    }
    setDatos({ ...datos, [names]: values });
  };
  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/profesor/${id}`);
    if (res.data[0]) {
      setDatos(res.data[0]);
    } else {
      console.error("No se pudo obtener los datos del producto");
    }
    setOpenModal(true);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (
      Object.values(datos).some(
        (field) => typeof field === "string" && field.trim() === ""
      )
    ) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else {
      try {
        const datosParaEnviar = {
          cedula: datos.cedula,
          p_nombre: datos.p_nombre,
          s_nombre: datos.s_nombre,
          p_apellido: datos.p_apellido,
          s_apellido: datos.s_apellido,
          telefono: datos.telefono,
          email: datos.email,
        };
        await axios.put(`${ServidorURL}/profesor/${id}`, datosParaEnviar, {
          headers: { "Content-Type": "application/json" },
        });
        setOpenModal(false);
        alert("Profesor", "Actualizado exitosamente!", "success");
      } catch (error) {
        if (error.response && error.response.status === 300) {
          alert(
            "Cedula invalida...",
            `Ya existe un usuario registrado con este número de cedula!`,
            "error"
          );
        } else {
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
        }
        return console.log(error);
      }
    }
  };
  return (
    <Container>
      <>
        <Button onClick={handleOpenModal} color="purple" size="sm">
          <FaEdit />
        </Button>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          position="top-center"
        >
          <Modal.Header>Editar Datos</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={handleSend}
            >
               {/*----- cedula ------- */}
               <div>
                <div className="mb-2 block">
                  <Label htmlFor="cedula" value="Cedula:" />
                </div>
                <TextInput
                  id="cedula"
                  name="cedula"
                  type="text"
                  placeholder="1234567890"
                  required
                  shadow
                />
              </div>
              {/*----- primer nombre ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="primer nombre" value="Primer Nombre:" />
                </div>
                <TextInput
                  id="p_nombre"
                  name="p_nombre"
                  type="text"
                  placeholder="Primer Nombre"
                  required
                  shadow
                />
              </div>
                   {/*----- segundo nombre ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="segundo nombre" value="Segundo Nombre:" />
                </div>
                <TextInput
                  id="s_nombre"
                  name="s_nombre"
                  type="text"
                  placeholder="Segundo Nombre"
                  required
                  shadow
                />
              </div>
              {/*----- primer apellido ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="primer apellido" value="Primer Apellido:" />
                </div>
                <TextInput
                  id="p_apellido"
                  name="p_apellido"
                  type="text"
                  placeholder="Primer Apellido"
                  required
                  shadow
                />
              </div>
               {/*----- segundo apellido ------- */}
               <div>
                <div className="mb-2 block">
                  <Label htmlFor="segundo apelldio" value="Segundo Apellido:" />
                </div>
                <TextInput
                  id="s_apellido"
                  name="s_apellido"
                  type="text"
                  placeholder="Segundo Apellido"
                  required
                  shadow
                />
              </div>
              {/*----- telefono ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="telefono" value="Teléfono:" />
                </div>
                <TextInput
                  id="telefono"
                  name="telefono"
                  type="text"
                  placeholder="Teléfono"
                  required
                  shadow
                />
              </div>
              {/*----- correo ------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="correo" value="Correo:" />
                </div>
                <TextInput
                  id="correo"
                  name="correo"
                  type="text"
                  placeholder="correo"
                  required
                  shadow
                />
              </div>
              <Button type="submit">Modificar Usuario</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
export function EliminarProfesor({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteDepa = async () => {
    try {
      const res = await axios.delete(`${ServidorURL}/personal/${id}`);
      alert("Personal", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Personal", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar este Registro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteDepa}>
                {"Aceptar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// -----------------------------------------
// registrar estudiantes
export function EliminaEstudiante({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteEstudiante = async () => {
    try {
      const res = await axios.delete(`${ServidorURL}/estudiante/${id}`);
      alert("Registro", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Registro", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar este Registro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteEstudiante}>
                {"Aceptar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function RegisEstudiante() {
  const [openModal, setOpenModal] = useState(false);

  // mostrar materias en select
  const [datosMencion, setDatosMencion] = useState([]);
  // mostrar años en select
  const [datosAnio, setDatosAnio] = useState([]);
  // mostrar seccion en select
  const [datoSeccion, setDatoSeccion] = useState([]);

  useEffect(() => {
    const ShowMencion = async () => {
      await axios
        .get(`${ServidorURL}/mension`)
        .then((res) => {
          console.log(res);
          setDatosMencion(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const ShowSeccion = async () => {
      await axios
        .get(`${ServidorURL}/seccion`)
        .then((res) => {
          console.log(res);
          setDatoSeccion(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowMencion();
    ShowSeccion();
  }, []);


  // todos los datos del formulario
  const [data, setData] = useState({
    cedula: "",
    p_nombre: "",
    s_nombre: "",
    p_apellido: "",
    s_apellido: "",
    telefono: "",
    email: "",
    id_year: "Selecciona:",
    id_seccion: "Selecciona:",
    id_mension: "Selecciona:"
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    if (names === "cedula") {
      value = value.replace(/[^0-9]/g, ""); // Esto eliminará cualquier caracter que no sea un dígito
    }
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      cedula: "",
      p_nombre: "",
      s_nombre: "",
      p_apellido: "",
      s_apellido: "",
      telefono: "",
      email: "",
      id_year: "",
      id_seccion: "",
      id_mension: ""
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url_0 = `${ServidorURL}/estudiante/entrada`;
      // Define la URL dependiendo del valor de estudiante
      const response = await axios.post(`${ServidorURL}/estudiante/entrada`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleCloseModal();
      alert("Estudiante", "Registro exitoso!", "success");
    } catch (error) {
      switch (error.response && error.response.status) {
        case 402:
          alert(
            "Estudiante no registrado!",
            `Debes registrar tu entrada primero`,
            "error"
          );
          break;
        case 403:
          alert(
            "Salida registrada",
            `Ya se ha registrado una salida hoy`,
            "error"
          );
          break;
        case 405:
          alert("Cedula errorea!", `La cedula no existe`, "error");
          break;
        case 406:
          alert(
            "Entrada registrada",
            `Ya se ha registrado una entrada hoy`,
            "error"
          );
          break;
        default:
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
          console.error(error);
      }
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Registrar Estudiante</Button>
      <Modal show={openModal} size="md" position="top-center" popup onClose={handleCloseModal}>
        <Modal.Header />
        <Modal.Body className="mt-2">
          <form
            className="space-y-6 flex max-w-md flex-col gap-4 uppercase"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-medium text-gray-900 text-center ">
              Registrar Estudiante
            </h3>
            {/*----- cedula ------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="cedula" value="Cedula:" />
                </div>
                <TextInput
                  id="cedula"
                  name="cedula"
                  type="text"
                  placeholder="1234567890"
                  required
                  shadow
                />
            </div>
            {/*----- primer nombre ------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="primer nombre" value="Primer Nombre:" />
                </div>
                <TextInput
                  id="p_nonmbre"
                  name="p_nombre"
                  type="text"
                  placeholder="Primer Nombre"
                  required
                  shadow
                />
            </div>
              {/*----- segundo nombre ------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="segundo nombre" value="Segundo Nombre:" />
                </div>
                <TextInput
                  id="s_segundo"
                  name="s_segundo"
                  type="text"
                  placeholder="Segundo Nombre"
                  required
                  shadow
                />
            </div>
            {/*----- primer apellido ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="primer apellido" value="Primer Apellido:" />
              </div>
              <TextInput
                id="p_apellido"
                name="p_apellido"
                type="text"
                placeholder="Primer Apellido"
                required
                shadow
              />
            </div>
            {/*----- segundo apellido ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="segundo apellido" value="Segundo Apellido:" />
              </div>
              <TextInput
                id="s_apellido"
                name="s_apellido"
                type="text"
                placeholder="Segundo Apellido"
                required
                shadow
              />
            </div>
            {/*----- telefono ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="telefono" value="Teléfono:" />
              </div>
              <TextInput
                id="telefono"
                name="telefono"
                type="text"
                placeholder="Teléfono"
                required
                shadow
              />
            </div>
            {/*----- correo ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="correo" value="Correo:" />
              </div>
              <TextInput
                id="correo"
                name="correo"
                type="text"
                placeholder="correo"
                required
                shadow
              />
            </div>
            {/*----- Año ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_anno" value="Selecciona el Año" />
              </div>
              <Select
                id="id_anno"
                name="id_anno"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Select>
            </div>
            {/*----- Seccion ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_seccion" value="Selecciona la Seccion" />
              </div>
              {/* select de mencion */}
              <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={data.id_seccion}
                  onChange={handleChange}
                >
                  {/* select por defecto, va didabled */}
                  <option value="Selecciona:" disabled>
                    Selecciona
                  </option>
                  {/* select que lleva los datos */}
                  {datoSeccion.map((seccion) => (
                    <option
                      value={seccion.id_seccion}
                      key={seccion.id_seccion}
                    >
                      {seccion.seccion}
                    </option>
                  ))}
                </Select>
            </div>
            {/*----- Mencion ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_mension" value="Selecciona la Mencion" />
              </div>
              {/* select de mencion */}
              <Select
                  id="id_mension"
                  name="id_mension"
                  value={data.id_mension}
                  onChange={handleChange}
                >
                  {/* select por defecto, va didabled */}
                  <option value="Selecciona:" disabled>
                    Selecciona
                  </option>
                  {/* select que lleva los datos */}
                  {datosMencion.map((mencion) => (
                    <option
                      value={mencion.id_mension}
                      key={mencion.id_mension}
                    >
                      {mencion.mension}
                    </option>
                  ))}
                </Select>
            </div>
                                  
            <div className="w-full flex justify-between">
              <Button type="submit">Registrar</Button>
              <Button color="failure" onClick={handleCloseModal}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function EditarEstudiante({ id }) {
  const [openModal, setOpenModal] = useState(false);
  // mostrar apartamentos en select
  const [datosDep, setDatosDep] = useState([]);
  //--------------------------------
  // mostrar categorias en select
  const [datosCat, setDatosCat] = useState([]);

  useEffect(() => {
    const ShowDepart = async () => {
      await axios
        .get(`${ServidorURL}/task`)
        .then((res) => {
          console.log(res);
          setDatosDep(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    const ShowCat = async () => {
      await axios
        .get(`${ServidorURL}/cargos`)
        .then((res) => {
          console.log(res);
          setDatosCat(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowDepart();
    ShowCat();
  }, []);
  //---------------------------------

  //---------------------------------
  // regsitrar datos
  const [datos, setDatos] = useState({
    cedula: "",
    p_nombre: "",
    s_nombre: "",
    p_apellido: "",
    s_apellido: "",
    telefono: "",
    email: "",
    id_year: "Selecciona:",
    id_seccion: "Selecciona:",
    id_mension: "Selecciona:",
  });

  // capturar eventos de inputs
  const handleChange = (e) => {
    let names = e.target.name;
    let values = e.target.value.toUpperCase();
    if (names === "cedula" || names === "telefono") {
      values = values.replace(/[^0-9]/g, ""); // Esto eliminará cualquier caracter que no sea un dígito
    }
    setDatos({ ...datos, [names]: values });
  };
  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/estudiante/${id}`);
    if (res.data[0]) {
      setDatos(res.data[0]);
    } else {
      console.error("No se pudo obtener los datos del estudiante");
    }
    setOpenModal(true);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (
      Object.values(datos).some(
        (field) => typeof field === "string" && field.trim() === ""
      )
    ) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else {
      try {
        const datosParaEnviar = {
          cedula: datos.cedula,
          p_nombre: datos.p_nombre,
          s_nombre: datos.s_nombre,
          p_apellido: datos.p_apellido,
          s_apellido: datos.s_apellido,
          telefono: datos.telefono,
          email: datos.email,
          id_year: datos.id_year,
          id_seccion: datos.id_seccion,
          id_mension: datos.id_mension,
        };
        await axios.put(`${ServidorURL}/estudiante/${id}`, datosParaEnviar, {
          headers: { "Content-Type": "application/json" },
        });
        setOpenModal(false);
        alert("Estudiante", "Actualizado exitosamente!", "success");
      } catch (error) {
        if (error.response && error.response.status === 300) {
          alert(
            "Cedula invalida...",
            `Ya existe un usuario registrado con este número de cedula!`,
            "error"
          );
        } else {
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
        }
        return console.log(error);
      }
    }
  };
  return (
    <Container>
      <>
        <Button onClick={handleOpenModal} color="purple" size="sm">
          <FaEdit />
        </Button>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          position="top-center"
        >
          <Modal.Header>Editar Datos</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={handleSend}
            >
            { /*----- cedula ------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="cedula" value="Cedula:" />
                </div>
                <TextInput
                  id="cedula"
                  name="cedula"
                  type="text"
                  placeholder="1234567890"
                  required
                  shadow
                />
            </div>
            {/*----- primer nombre ------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="primer nombre" value="Primer Nombre:" />
                </div>
                <TextInput
                  id="p_nonmbre"
                  name="p_nombre"
                  type="text"
                  placeholder="Primer Nombre"
                  required
                  shadow
                />
            </div>
              {/*----- segundo nombre ------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="segundo nombre" value="Segundo Nombre:" />
                </div>
                <TextInput
                  id="s_segundo"
                  name="s_segundo"
                  type="text"
                  placeholder="Segundo Nombre"
                  required
                  shadow
                />
            </div>
            {/*----- primer apellido ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="primer apellido" value="Primer Apellido:" />
              </div>
              <TextInput
                id="p_apellido"
                name="p_apellido"
                type="text"
                placeholder="Primer Apellido"
                required
                shadow
              />
            </div>
            {/*----- segundo apellido ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="segundo apellido" value="Segundo Apellido:" />
              </div>
              <TextInput
                id="s_apellido"
                name="s_apellido"
                type="text"
                placeholder="Segundo Apellido"
                required
                shadow
              />
            </div>
            {/*----- telefono ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="telefono" value="Teléfono:" />
              </div>
              <TextInput
                id="telefono"
                name="telefono"
                type="text"
                placeholder="Teléfono"
                required
                shadow
              />
            </div>
            {/*----- correo ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="correo" value="Correo:" />
              </div>
              <TextInput
                id="correo"
                name="correo"
                type="text"
                placeholder="correo"
                required
                shadow
              />
            </div>
            {/*----- Año ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_anno" value="Selecciona el Año" />
              </div>
              <Select
                id="id_anno"
                name="id_anno"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Select>
            </div>
            {/*----- Seccion ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_seccion" value="Selecciona la Seccion" />
              </div>
              {/* select de mencion */}
              <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={data.id_seccion}
                  onChange={handleChange}
                >
                  {/* select por defecto, va didabled */}
                  <option value="Selecciona:" disabled>
                    Selecciona
                  </option>
                  {/* select que lleva los datos */}
                  {datoSeccion.map((seccion) => (
                    <option
                      value={seccion.id_seccion}
                      key={seccion.id_seccion}
                    >
                      {seccion.seccion}
                    </option>
                  ))}
                </Select>
            </div>
            {/*----- Mencion ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_mension" value="Selecciona la Mencion" />
              </div>
              {/* select de mencion */}
              <Select
                  id="id_mension"
                  name="id_mension"
                  value={data.id_mension}
                  onChange={handleChange}
                >
                  {/* select por defecto, va didabled */}
                  <option value="Selecciona:" disabled>
                    Selecciona
                  </option>
                  {/* select que lleva los datos */}
                  {datosMencion.map((mencion) => (
                    <option
                      value={mencion.id_mension}
                      key={mencion.id_mension}
                    >
                      {mencion.mension}
                    </option>
                  ))}
                </Select>
            </div>
              <Button type="submit">Modificar Estudiante</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}

// ------------------------------------------
export function RegisVisita() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    nombre: "",
    cedula: "",
    motivo: "",
    id_departamento: "Selecciona:",
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    if (names === "cedula") {
      value = value.replace(/[^0-9]/g, ""); // Esto eliminará cualquier caracter que no sea un dígito
    }
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      nombre: "",
      cedula: "",
      motivo: "",
      id_departamento: "Selecciona:",
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // mostrar apartamentos en select
  const [datosDep, setDatosDep] = useState([]);
  useEffect(() => {
    ShowDepart();
  }, []);
  const ShowDepart = async () => {
    await axios
      .get(`${ServidorURL}/task`)
      .then((res) => {
        console.log(res);
        setDatosDep(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (Object.values(data).some((field) => field.trim() === "")) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else {
      try {
        await axios.post(`${ServidorURL}/visita/entrada`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseModal();
        alert("Visita", "Registrada exitosamente!", "success");
      } catch (error) {
        switch (error.response && error.response.status) {
          case 406:
            alert(
              "Entrada registrada",
              `Ya se ha registrado esta visita hoy`,
              "error"
            );
            break;
          default:
            alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
            console.error(error);
        }
      }
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Registrar Visita</Button>
      <Modal show={openModal} size="md" popup onClose={handleCloseModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center align-middle">
            <div className="flex ">
              <img src={logo} alt="Logo CNE" className="w-20" />
            </div>
          </div>
          <form
            className="space-y-6 flex max-w-md flex-col gap-4"
            onSubmit={handleSend}
          >
            <h3 className="text-xl font-medium text-gray-900 text-center ">
              REGISTRAR VISITA
            </h3>
            {/* NOMBRE */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombre" value="Nombre:" />
              </div>
              <TextInput
                id="nombre"
                name="nombre"
                value={data.nombre}
                onChange={handleChange}
                placeholder="Nombre:"
              />
            </div>
            {/* CEDULA */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cedula" value="Cedula:" />
              </div>
              <TextInput
                id="cedula"
                name="cedula"
                value={data.cedula}
                onChange={handleChange}
                placeholder="Ingrese su Cedula de identidad"
              />
            </div>
            {/* MOTIVO */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="motivo" value="Motivo:" />
              </div>
              <TextInput
                id="motivo"
                name="motivo"
                value={data.motivo}
                onChange={handleChange}
                placeholder="Ingrese su Motivo de Visita"
              />
            </div>
            {/* DEPARTAMENtO */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Departamento" value="Departamento:" />
              </div>
              <Select
                id="id_departamento"
                name="id_departamento"
                onChange={handleChange}
                value={data.id_departamento}
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                {datosDep.map((depart) => (
                  <option
                    value={depart.id_departamento}
                    key={depart.id_departamento}
                  >
                    {depart.departamento}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full flex justify-between">
              <Button type="submit">Registrar</Button>
              <Button color="failure" onClick={handleCloseModal}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function RegisSalidaVisita() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    cedula: "",
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    if (names === "cedula") {
      value = value.replace(/[^0-9]/g, ""); // Esto eliminará cualquier caracter que no sea un dígito
    }
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      cedula: "",
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${ServidorURL}/visita/salida`;
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleCloseModal();
      alert("Salida", "Registro exitoso!", "success");
    } catch (error) {
      switch (error.response && error.response.status) {
        case 403:
          alert(
            "Salida registrada",
            "Ya se ha registrado una salida hoy",
            "error"
          );
          break;
        case 405:
          alert(
            "Cedula errorea!",
            `La cedula no se ha registrado hoy`,
            "error"
          );
          break;
        default:
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
          console.error(error);
      }
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure">
        Registrar Salida
      </Button>
      <Modal show={openModal} size="md" popup onClose={handleCloseModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center align-middle">
            <div className="flex ">
              <img src={logo} alt="Logo CNE" className="w-20" />
            </div>
          </div>
          <form
            className="space-y-6 flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h3 className="text-xl font-medium text-gray-900 text-center ">
              REGISTRAR SALIDA
            </h3>
            {/*---- cedula -----*/}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_personal" value="Cedula:" />
              </div>
              <TextInput
                id="cedula"
                name="cedula"
                placeholder="Ingrese su Cedula de identidad"
                onChange={handleChange}
                value={data.cedula}
              />
            </div>
            <div className="w-full flex justify-between">
              <Button type="submit">Registrar</Button>
              <Button color="failure" onClick={handleCloseModal}>
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function EliminaVisita({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteVisita = async () => {
    try {
      const res = await axios.delete(`${ServidorURL}/visita/${id}`);
      alert("Registro", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Registro", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar este Registro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteVisita}>
                {"Eliminar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// ---------------------------------------
// modal materias
export function ModalMateria() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    materia: "", descripcion: ""
  });

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      materia: "",
      descripcion: ""
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (data.materia.trim() === "" || data.descripcion.trim() === "") {
      alert("Campo vacio", "Debes llenar todos los campos", "warning");
    } else {
      try {
        await axios.post(`${ServidorURL}/materias`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseModal();
        alert("Materia", "Registro exitoso!", "success");
      } catch (error) {
        switch (error.response && error.response.status) {
          case 409:
            alert(
              "Materia existente",
              "Ya se ha registrado una materia con el mismo nombre",
              "error"
            );
            break;
          
          default:
            alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
            console.error(error);
        }
      }
    }
  };

  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)}>
          Registrar Materia
        </Button>
        <Modal show={openModal} onClose={handleCloseModal}>
          <Modal.Header>Registrar Materia</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full uppercase"
              onSubmit={handleSend}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="materia" value="Materia:" />
                </div>
                <TextInput
                  id="id_materia"
                  type="text"
                  placeholder="Nombre de la Materia"
                  name="materia"
                  shadow
                  className="uppercase"
                  onChange={handleChange}
                  value={data.materia}
                />
                <div className="mb-2 block">
                  <Label htmlFor="descripcion" value="Descripción:" />
                </div>
                <TextInput
                  id="id_materia"
                  type="text"
                  placeholder="Descripcion de la materia (max 150 caracteres)"
                  name="descripcion"
                  shadow
                  className="uppercase"
                  onChange={handleChange}
                  value={data.descripcion}
                  maxLength={150}
                />
              </div>
              <Button type="submit">Registrar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
// modal eliminar materia
export function EliminarMateria({ id }) {
  const [openModal, setOpenModal] = useState(false);

  const deleteMateria = async () => {
    try {
      const res = await axios.delete(`${ServidorURL}/materias/${id}`);
      alert("Materia", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Materia", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar esta Materia?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteMateria}>
                {"Eliminar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
// modal editar materia
export function EditarMateria({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({
    materia: "",
    descripcion: ""
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    console.log(`valores = ${names} == ${value}`)
    setDatos({ ...datos, [names]: value });
  
  };

  // actualizar
  const actualizar = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`${ServidorURL}/materias/${id}`, { 
        materia: datos.materia,
        descripcion: datos.descripcion
       });
      setOpenModal(false);
      alert("Materia", "Actualización exitososa!", "success");
    } catch (error) {
      console.log(`Error = ${error}`);
      alert("Materia", "Error al actualizar", "error");
    }
    
  };

  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/materias/${id}`);
    setDatos(res.data[0]);
    setOpenModal(true);
  };


  return (
    <Container>
      <>
        <Button onClick={handleOpenModal} color="purple" size="sm">
          <FaEdit />
        </Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Editar Materia</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={actualizar}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="materia" value="Materia:" />
                </div>
                <TextInput
                  id="materia"
                  type="text"
                  placeholder="Materia"
                  onChange={handleChange}
                  name="materia"
                  value={datos.materia}
                  shadow
                />
                <div className="mb-2 block">
                  <Label htmlFor="descripcion" value="Descripción:" />
                </div>
                <TextInput
                  id="id_materia"
                  type="text"
                  placeholder="Descripcion de la materia (max 150 caracteres)"
                  name="descripcion"
                  shadow
                  className="uppercase"
                  onChange={handleChange}
                  value={datos.descripcion}
                  maxLength={150}
                />
              </div>
              <Button type="submit">Modificar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
// ----------------------------------------

// modal cargos
export function ModalCargo() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    cargo: "",
    cantidad: "",
  });

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    if (names === "cantidad") {
      value = value.replace(/[^0-9]/g, ""); // Esto eliminará cualquier caracter que no sea un dígito
    }
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      cargo: "",
      cantidad: "",
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (data.cargo.trim() === "" || data.cantidad.trim() === "") {
      alert("Campo vacio", "Debes llenar todos los campos", "warning");
    } else {
      try {
        await axios.post(`${ServidorURL}/cargos`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseModal();
        alert("Cargo", "Registro exitoso!", "success");
      } catch (error) {
        alert("Oops...", "Ha ocurrido un error al registrar!", "error");
        return console.log(error);
      }
    }
  };
  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)}>Registrar Cargo</Button>
        <Modal show={openModal} onClose={handleCloseModal}>
          <Modal.Header>Registrar un Nuevo Cargo</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={handleSend}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cargo" value="Cargo:" />
                </div>
                <TextInput
                  id="cargo"
                  name="cargo"
                  type="text"
                  placeholder="Nombre del Cargo"
                  onChange={handleChange}
                  value={data.cargo}
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cantidad" value="Cantidad de Puestos:" />
                </div>
                <TextInput
                  id="cantidad"
                  type="number"
                  name="cantidad"
                  min="0"
                  max="99"
                  placeholder="Ingrese una cantidad"
                  onChange={handleChange}
                  value={data.cantidad}
                  shadow
                />
              </div>
              <Button type="submit">Registrar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
// eliminar cargos
export function EliminarCargo({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteDepa = async () => {
    try {
      const res = await axios.delete(`${ServidorURL}/cargos/${id}`);
      alert("Cargo", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      alert("Cargo", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar este Registro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteDepa}>
                {"Eliminar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

//----------------------------------------------
// registrar notas
export function RegisNotas({ id }) {
  const [openModal, setOpenModal] = useState(false);

  // mostrar apartamentos en select
  const [datosDep, setDatosDep] = useState([]);
  useEffect(() => {
    ShowDepart();
  }, []);
  const ShowDepart = async () => {
    await axios
      .get(`${ServidorURL}/task`)
      .then((res) => {
        console.log(res);
        setDatosDep(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //--------------------------------
  // mostrar categorias en select
  const [datosCat, setDatosCat] = useState([]);
  useEffect(() => {
    ShowCat();
  }, []);
  const ShowCat = async () => {
    await axios
      .get(`${ServidorURL}/categoria`)
      .then((res) => {
        console.log(res);
        setDatosCat(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //---------------------------------
  // regsitrar datos
  const [datos, setDatos] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    año: "Selecciona:",
    id_materias: "Selecciona:",
    id_mencion: "Selecciona:",
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let values = e.target.value.toUpperCase();
    console.log(names);
    setDatos({ ...datos, [names]: values });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setDatos({
      cedula: "",
      nombres: "",
      apellidos: "",
      año: "Selecciona:",
      id_materias: "Selecciona:",
      id_mencion: "Selecciona:",
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (Object.values(datos).some((field) => field.trim() === "")) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else {
      try {
        await PeticionAxios("inventary", "post", datos);
        limpiarCampos();
        setOpenModal(false);
        alert("Articulo", "Registrado exitosamente!", "success");
      } catch (error) {
        alert("Oops...", "Ha ocurrido un error en el registro!", "error");
        return console.log(error);
      }
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Buscar Clase</Button>
      <Modal
        show={openModal}
        size="md"
        position="top-center"
        popup
        onClose={handleCloseModal}
      >
        <Modal.Header />
        <Modal.Body className="mt-2">
          <form
            className="flex flex-col gap-4 max-w-full uppercase"
            onSubmit={handleSend}
          >
            <h3 className="text-xl font-medium text-gray-900 text-center ">
              Buscar Clase
            </h3>
                 {/* ------ clase --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="id_profesor" value="Selecciona el Profesor" />
                </div>
                <Select
                  id="id_profesor"
                  name="id_profesor"
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  <option value="3">{["1234567"," ","Juan"," ", "Perez"]}</option>
                  <option value="3">{["2134445"," ","Jose"," ", "Mendez"]}</option>
                  <option value="2">{["5232134"," ","Pedro"," ", "Aguilar"]}</option>
                  <option value="1">{["5213333"," ","Carlos"," ", "Martinez"]}</option>
                </Select>
              </div>
            <Button type="submit">Buscar</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export function EditNotas({ id }) {
  const [openModal, setOpenModal] = useState(false);
  // mostrar apartamentos en select
  const [datosDep, setDatosDep] = useState([]);
  useEffect(() => {
    ShowDepart();
  }, []);
  const ShowDepart = async () => {
    await axios
      .get(`${ServidorURL}/task`)
      .then((res) => {
        console.log(res);
        setDatosDep(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //--------------------------------
  // mostrar categorias en select
  const [datosCat, setDatosCat] = useState([]);
  useEffect(() => {
    ShowCat();
  }, []);
  const ShowCat = async () => {
    await axios
      .get(`${ServidorURL}/categoria`)
      .then((res) => {
        console.log(res);
        setDatosCat(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //---------------------------------
  // actualizar datos
  const [datos, setDatos] = useState({
    nombre: "",
    marca: "",
    codigo: "",
    modelo: "",
    estatus: "Selecciona:",
    cantidad: "",
    id_departamento: "Selecciona:",
    id_categoria: "Selecciona:",
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let values = e.target.value.toUpperCase();
    setDatos({ ...datos, [names]: values });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setDatos({
      nombre: "",
      marca: "",
      codigo: "",
      modelo: "",
      estatus: "Selecciona:",
      cantidad: "",
      id_departamento: "Selecciona:",
      id_categoria: "Selecciona:",
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };

  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/inventary/${id}`);
    if (res.data[0]) {
      setDatos(res.data[0]);
    } else {
      console.error("No se pudo obtener los datos del producto");
    }
    setOpenModal(true);
  };

  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (
      Object.values(datos).some(
        (field) => typeof field === "string" && field.trim() === ""
      )
    ) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else {
      // si los campos no estan vacios realiza la funcion
      const datosParaEnviar = {
        nombre: datos.nombre,
        marca: datos.marca,
        codigo: datos.codigo,
        modelo: datos.modelo,
        estatus: datos.estatus,
        cantidad: datos.cantidad,
        id_categoria: datos.id_categoria,
        id_departamento: datos.id_departamento,
      };
      //await PeticionAxios(`inventary${id}`, 'put', datosParaEnviar)
      await axios.put(`${ServidorURL}/inventary/${id}`, datosParaEnviar, {
        headers: { "Content-Type": "application/json" },
      });
      handleCloseModal();
      alert("Articulo", "Actualizado exitosamente!", "success");
    }
  };

  return (
    <>
      <Button onClick={handleOpenModal} color="purple" size="sm">
        <FaEdit />
      </Button>
      <Modal show={openModal} size="md" popup onClose={handleCloseModal}>
        <Modal.Header />
        <Modal.Body>
          <form
            className="flex flex-col gap-4 max-w-full"
            onSubmit={handleSend}
          >
            <h3 className="text-xl font-medium text-gray-900 text-center ">
              ACTUALIZAR PRODUCTO
            </h3>
            {/* ------ nombre --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombre" value="Nombre:" />
              </div>
              <TextInput
                id="nombre"
                type="text"
                placeholder="Nombre Producto"
                shadow
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
              />
            </div>
            {/* ------ marca --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="marca" value="Marca:" />
              </div>
              <TextInput
                id="marca"
                type="text"
                placeholder="Marca Producto"
                shadow
                name="marca"
                value={datos.marca}
                onChange={handleChange}
              />
            </div>
            {/* ------ codigo --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="codigo" value="Codigo:" />
              </div>
              <TextInput
                id="codigo"
                type="text"
                placeholder="Codigo del Producto"
                shadow
                name="codigo"
                value={datos.codigo}
                onChange={handleChange}
              />
            </div>
            {/* ------ modelo --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="modelo" value="Modelo:" />
              </div>
              <TextInput
                id="modelo"
                type="text"
                placeholder="Modelo del Producto"
                shadow
                name="modelo"
                value={datos.modelo}
                onChange={handleChange}
              />
            </div>
            {/* ------ cantidad --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="cantidad" value="Cantidad:" />
              </div>
              <TextInput
                id="cantidad"
                type="number"
                min="0"
                name="cantidad"
                placeholder="Cantidad"
                value={datos.cantidad}
                onChange={handleChange}
                shadow
              />
            </div>
            {/* ------ estatus --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="estatus" value="Estado del Producto" />
              </div>
              <Select
                id="estatus"
                name="estatus"
                onChange={handleChange}
                value={datos.estatus}
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="NUEVO">NUEVO</option>
                <option value="USADO">USADO</option>
                <option value="DETERIORADO">DETERIORADO</option>
              </Select>
            </div>
            {/* ------ departamento --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="Departamento" value="Departamento:" />
              </div>
              <Select
                id="id_departamento"
                name="id_departamento"
                onChange={handleChange}
                value={datos.id_departamento}
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                {datosDep.map((depart) => (
                  <option
                    value={depart.id_departamento}
                    key={depart.id_departamento}
                  >
                    {depart.departamento}
                  </option>
                ))}
              </Select>
            </div>
            {/* ------ categoria --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_categoria" value="Categoria:" />
              </div>
              <Select
                id="id_categoria"
                name="id_categoria"
                onChange={handleChange}
                value={datos.id_categoria}
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                {datosCat.map((category) => (
                  <option
                    value={category.id_categoria}
                    key={category.id_categoria}
                  >
                    {category.categoria}
                  </option>
                ))}
              </Select>
            </div>
            <Button type="submit">Actualizar</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export function EliminarNotas({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteInven = async () => {
    try {
      await axios.delete(`${ServidorURL}/inventary/${id}`);
      alert("Articulo", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Articulo", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar este Registro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteInven}>
                {"Eliminar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
//---------------------------------------------

// registrar clases
export function ModalClases() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    usuario: "",
    pass: "",
    quest: "Selecciona:",
    resp: "",
  });
  const [secondPass, setSecondPass] = useState("");

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    if (names === "secondPass") {
      setSecondPass(value);
    } else {
      setData({ ...data, [names]: value });
    }
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (Object.values(data).some((field) => field.trim() === "")) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else if (data.pass !== secondPass) {
      return alert(
        "Contraseñas no coinciden",
        "Las contraseñas ingresadas no son iguales",
        "error"
      );
    } else {
      try {
        // peticion de registro
        await PeticionAxios("signup", "post", data);
        // vaciar los campos al enviar el formulario
        setData({ usuario: "", pass: "", quest: "Selecciona:", resp: "" });
        setSecondPass("");
        setOpenModal(false);
        // alerta de exito
        alert("Usuario", "Registro exitoso!", "success");
      } catch (error) {
        // alerta de errores
        if (error.response && error.response.status === 300) {
          alert(
            "Usuario invalido...",
            `Ya existe un usuario registrado con ese nombre!`,
            "error"
          );
        } else {
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
        }
        return console.log(error);
      }
    }
  };
  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)} className="m-auto">
          Registrar Clase
        </Button>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          position="top-center"
        >
          <Modal.Header>Registrar Clase</Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleSend}
              className="flex flex-col gap-4 max-w-full"
            >
            {/* ------ profesor --------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="id_profesor" value="Selecciona el Profesor" />
                </div>
                <Select
                  id="id_profesor"
                  name="id_profesor"
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  <option value={["1234567","Juan", "Perez"]}>{["1234567"," ","Juan"," ", "Perez"]}</option>
                  <option value={["2134445","Jose", "Mendez"]}>{["2134445"," ","Jose"," ", "Mendez"]}</option>
                  <option value={["5232134","Pedro", "Aguilar"]}>{["5232134"," ","Pedro"," ", "Aguilar"]}</option>
                  <option value={["5213333","Carlos", "Martinez"]}>{["5213333"," ","Carlos"," ", "Martinez"]}</option>
                </Select>
            </div>
            {/* ------ materia --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="materia" value="Materia:" />
              </div>
              <Select
                id="materia"
                name="materia"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                  </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Select>
            </div> 
            {/* ------ año --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="año" value="Año:" />
              </div>
              <Select
                id="año"
                name="año"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Select>
            </div>            
            {/* ------ seccion --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="seccion" value="Seccion:" />
              </div>
              <Select
                id="seccion"
                name="seccion"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </Select>
            </div>                  
            {/* ------ mencion --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mencion" value="Mencion:" />
              </div>
              <Select
                id="mencion"
                name="mencion"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Select>
            </div>         
            <Button type="submit">Guardar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
export function EliminarClases({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const deleteInven = async () => {
    try {
      // peticion al servidor
      await axios.delete(`${ServidorURL}/signup/${id}`, {
        withCredentials: true,
      });
      // alerta de exito
      alert("Usuario", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      switch (error.response && error.response.status) {
        case 400:
          alert("Imposible", "No puedes eliminar tu usuario!", "warning");
          break;
        default:
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
          console.error(error);
      }
      console.error("error", error);
      // alerta de error
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar este Registro?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteInven}>
                {"Eliminar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function EditarClases({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const [secondPass, setSecondPass] = useState("");

  //---------------------------------
  // actualizar datos
  const [datos, setDatos] = useState({
    profesor: "",
    materia: "",
    year: "",
    seccion: "",
    mencion: "",
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    if (names === "secondPass") {
      setSecondPass(value);
    } else {
      setDatos({ ...datos, [names]: value });
    }
  };
  // limpiar datos del formulario
  const limpiarCampos = () => {
    setDatos({
      usuario: "",
      pass: "",
      quest: "",
      resp: "",
    });
    setSecondPass("");
  };
  // cerrar modal
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // mostrar los datos en los inputs
  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/clases/${id}`);
    if (res.data[0]) {
      setDatos(res.data[0]);
    } else {
      console.error("No se pudo obtener los datos de la clase");
    }
    setOpenModal(true);
  };

  // enviar los datos nuevos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (
      Object.values(datos).some(
        (field) => typeof field === "string" && field.trim() === ""
      )
    ) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
      // valida que ambas contraseñas sean iguales
    } else if (datos.pass !== secondPass) {
      return alert(
        "Contraseñas no coinciden",
        "Las contraseñas ingresadas no son iguales",
        "error"
      );
    } else {
      // si los campos no estan vacios realiza la funcion
      const datosParaEnviar = {
        profesor: datos.profesor,
        materia: datos.materia,
        year: datos.year,
        seccion: datos.seccion,
        mencion: datos.mencion,
      };
      try {
        await axios.put(`${ServidorURL}/clase/${id}`, datosParaEnviar, {
          headers: { "Content-Type": "application/json" },
        });
        setOpenModal(false);
        limpiarCampos();
        alert("Clase", "Actualizado exitosamente!", "success");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(
            "Clase invalido...",
            `Ya existe un clase registrado con ese nombre!`,
            "error"
          );
        } else {
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
        }
        return console.log(error);
      }
    }
  };
  return (
    <Container>
      <>
        <Button onClick={handleOpenModal} color="purple" size="sm">
          <FaEdit />
        </Button>
        <Modal
          show={openModal}
          onClose={handleCloseModal}
          position="top-center"
        >
          <Modal.Header>Editar la Clase</Modal.Header>
          <Modal.Body>
            <form
              onSubmit={handleSend}
              className="flex flex-col gap-4 max-w-full"
            >
            {/* ------ profesor --------- */}
            <div>
                <div className="mb-2 block">
                  <Label htmlFor="id_profesor" value="Selecciona el Profesor" />
                </div>
                <Select
                  id="id_profesor"
                  name="id_profesor"
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  <option value={["1234567","Juan", "Perez"]}>{["1234567"," ","Juan"," ", "Perez"]}</option>
                  <option value={["2134445","Jose", "Mendez"]}>{["2134445"," ","Jose"," ", "Mendez"]}</option>
                  <option value={["5232134","Pedro", "Aguilar"]}>{["5232134"," ","Pedro"," ", "Aguilar"]}</option>
                  <option value={["5213333","Carlos", "Martinez"]}>{["5213333"," ","Carlos"," ", "Martinez"]}</option>
                </Select>
            </div>
            {/* ------ materia --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="materia" value="Materia:" />
              </div>
              <Select
                id="materia"
                name="materia"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Select>
            </div> 
            {/* ------ año --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="año" value="Año:" />
              </div>
              <Select
                id="año"
                name="año"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Select>
            </div>            
            {/* ------ seccion --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="seccion" value="Seccion:" />
              </div>
              <Select
                id="seccion"
                name="seccion"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
              </Select>
            </div>                  
            {/* ------ mencion --------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="mencion" value="Mencion:" />
              </div>
              <Select
                id="mencion"
                name="mencion"
              >
                <option value="Selecciona:" disabled>
                  Selecciona:
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Select>
            </div>  
              <Button type="submit">Actualizar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
//----------------------------------------------
// registrar mencion
export function ModalMencion() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    mension: ""
  });
  
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({ mension: "" });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (data.mension.trim() === "") {
      alert("Campo vacio", "Debes llenar todos los campos", "warning");
    } else {
      try {
        await axios.post(`${ServidorURL}/mencion`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseModal();
        alert("Mencion", "Registro exitoso!", "success");
      } catch (error) {
        switch (error.response && error.response.status) {
          case 409:
            alert(
              "Mencion existente",
              "Ya se ha registrado una materia con el mismo nombre",
              "error"
            );
            break;
          
          default:
            alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
            console.error(error);
        }
      }
    }
  };

  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)}>Registrar Mencion</Button>
        <Modal
          show={openModal}
          onClose={handleCloseModal}
          position="top-center"
        >
          <Modal.Header>Registrar Mencion</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={handleSend}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mencion" value="Mencion:" />
                </div>
                <TextInput
                  id="id_mension"
                  type="text"
                  placeholder="Nombre Mencion"
                  name="mension"
                  shadow
                  className="uppercase"
                  onChange={handleChange}
                  value={data.mension}
                />
              </div>
              <Button type="submit">Registrar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}
export function EliminarMencion({ id }) {
  const [openModal, setOpenModal] = useState(false);

  const deleteMencion = async () => {
    try {
      await axios.delete(`${ServidorURL}/mencion/${id}`);

      alert("Mencion", "Eliminado exitosamente!", "success");
    } catch (error) {
      return alert("Mencion", "Error en la eliminacion", "error");
    }
    setOpenModal(false);
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        <FaEraser />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-icon text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Estas seguro de querer eliminar esta Mencion?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteMencion}>
                {"Eliminar"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function EditarMencion({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({
      mension: ""
  });
 
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    console.log(`valores = ${names} == ${value}`)
    setDatos({ ...datos, [names]: value });
  
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setDatos("");
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // actualizar
  const actualizar = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`${ServidorURL}/mencion/${id}`, { 
        mension: datos.mension
       });
      setOpenModal(false);
      alert("Mencion", "Actualización exitososa!", "success");
    } catch (error) {
      console.log(`Error = ${error}`);
      alert("Materia", "Error al actualizar", "error");
    }
  };
  // ver los datos en el input
  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/mencion/${id}`);
    setDatos(res.data[0]);
    setOpenModal(true);
  };
  return (
    <Container>
      <>
        <Button onClick={handleOpenModal} color="purple" size="sm">
          <FaEdit />
        </Button>
        <Modal
          show={openModal}
          onClose={handleCloseModal}
          position="top-center"
        >
          <Modal.Header>Actualizar Mencion</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={actualizar}
            >
               <div>
                <div className="mb-2 block">
                  <Label htmlFor="mension" value="Mencion:" />
                </div>
                <TextInput
                  id="id_mension"
                  name="mension"
                  type="text"
                  placeholder="Nombre Mencion"
                  onChange={handleChange}
                  shadow
                  value={datos.mension}
                  className="uppercase"
                />
              </div>
              <Button type="submit">Actualizar</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="dark" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  );
}

const Container = styled.div`
.Logocontent {
  display: flex;
  justify-content: center;
  align-items: center;
  .imgcontent {
    display: flex;
    img {
     max-width: 100%;
      height: auto;
  }`;
