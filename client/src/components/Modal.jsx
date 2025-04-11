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
  HiLockClosed
} from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { alert, PeticionAxios } from "../utils/generic";
import { ServidorURL } from "../config/config";
import "../css/principal.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvided";

// ---------------------------------------- 
// login 69454----318141
export function Login() {
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({
    cedula: "",
    clave: "",
  });
  const navigate = useNavigate();
  // accede a la funcion login de useAuth
  const { authState, login } = useAuth();

  // En tu componente de inicio de sesión
  useEffect(() => {
    if (authState.isAuthenticated) {
      // Redirige cuando el estado de autenticación cambie a true
      navigate("/app/*");
    }
  }, [authState.isAuthenticated, navigate]);

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    setDatos({ ...datos, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      cedula: "",
      clave: ""
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    limpiarCampos();
  };
  const handleSend = async (e) => {
    e.preventDefault();

    try {
      if (datos.cedula.trim() === "" && datos.clave.trim() === "") {
        alert("Campo vacio","Debes ingresar todos los datos","warning");
      } else {
        const res = await axios.post(`${ServidorURL}/sessionLogin`, datos, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        
        if (res.status === 200) {
          login(res.data.mensaje);
          navigate("/app/*");
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response);
      if (error.response && error.response.status === 404) {
        alert("Oops...",`Cedula o contraseña incorerctos!`,"error");
      } else {
        alert("Oops...",`Ha ocurrido un error! ${error}`,"error");
      }
      return console.log(error);
    }
  };


  return (
    <Container>
      <>
        <Button className="boton-login" onClick={() => setOpenModal(true)}>
          Iniciar Sesión
        </Button>
        <Modal 
          show={openModal} 
          onClose={handleCloseModal}
          position="top-center"
        >
          <Modal.Body>
            <form action="" className="flex flex-col gap-2 max-w-full" onSubmit={handleSend}>
              <div className="flex justify-center">
                <img src={logo} alt="Logo" className="w-24" />
              </div>
              <p className="heading flex justify-center">Iniciar sesión</p>
              <div className="inputContainer">
                <HiUser className="inputIcon" />
                <input
                  type="text"
                  className="inputField"
                  id="cedula"
                  name="cedula"
                  value={datos.cedula}
                  placeholder="Cedula"
                  onChange={handleChange}
                />
              </div>

              <div className="inputContainer">
                <HiLockClosed className="inputIcon" />
                <input
                  type="password"
                  className="inputField"
                  id="clave"
                  name="clave"
                  value={datos.clave}
                  onChange={handleChange}
                  placeholder="Clave"
                />
              </div>

              <button id="button">Ingresar</button>
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
// registrar profesor
export function ModalRegis() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    cedula: "",
    p_nombre: "",
    s_nombre: "",
    p_apellido: "",
    s_apellido: "",
    telefono: "",
    email: ""
  });

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    if (names === "cedula") {
      // Esto eliminará cualquier caracter que no sea un dígito
      value = value.replace(/[^0-9]/g, ""); 
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
      email: ""
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
    if (
          data.cedula.trim() === "" || 
          data.p_nombre.trim() === "" ||
          data.s_nombre.trim() === "" ||
          data.p_apellido.trim() === "" ||
          data.s_apellido.trim() === "" ||
          data.telefono.trim() === "" ||
          data.email.trim() === ""
        ) {
      alert("Campo vacio", "Debes llenar todos los campos", "warning");
    } else {
      try {
        await axios.post(`${ServidorURL}/profesor`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseModal();
        alert("Profesor", "Registro exitoso!", "success");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert(
            "Cedula invalida...",
            `Ya existe un profesor registrado con este número de cedula!`,
            "error"
          );
        } else if (error.response && error.response.status === 408) {
          alert(
            "Cedula invalida...",
            `Ya existe un profesor registrado con este número de cedula!`,
            "error"
          );
        } else {
          alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
        }
      }
    }
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
              onSubmit={handleSend}
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
                  value={data.cedula}
                  onChange={handleChange}
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
                  value={data.p_nombre}
                  onChange={handleChange}
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
                  value={data.s_nombre}
                  onChange={handleChange}
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
                  value={data.p_apellido}
                  onChange={handleChange}
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
                  value={data.s_apellido}
                  onChange={handleChange}
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
                  value={data.telefono}
                  onChange={handleChange}
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
                  id="email"
                  name="email"
                  type="text"
                  value={data.email}
                  onChange={handleChange}
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
      console.error("No se pudo obtener los datos del profesor");
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
        await axios.put(`${ServidorURL}/profesor/${id}`, datos, {
          headers: { "Content-Type": "application/json" },
        });
        setOpenModal(false);
        alert("Profesor", "Actualizado exitosamente!", "success");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert(
            "Cedula invalida...",
            `Ya existe un profesor registrado con este número de cedula!`,
            "error"
          );
        } else if (error.response && error.response.status === 408) {
          alert(
            "Cedula invalida...",
            `Ya existe un profesor registrado con este número de cedula!`,
            "error"
          );
        } else if (error.response && error.response.status === 404) {
          alert(
            "Profesor no existe",
            `Este profesor no existe!`,
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
                  value={datos.cedula}
                  onChange={handleChange}
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
                  value={datos.p_nombre}
                  onChange={handleChange}
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
                  value={datos.s_nombre}
                  onChange={handleChange}
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
                  value={datos.p_apellido}
                  onChange={handleChange}
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
                  value={datos.s_apellido}
                  onChange={handleChange}
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
                  value={datos.telefono}
                  onChange={handleChange}
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
                  id="email"
                  name="email"
                  type="text"
                  value={datos.email}
                  onChange={handleChange}
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
      const res = await axios.delete(`${ServidorURL}/profesor/${id}`);
      alert("Profesor", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(
          "Profesor",
          `El profesor no existe`,
          "error"
        );
      } else {
        alert("Profesor", "Error en la eliminación!", "error");
      }
      console.error("error", error);
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
      await axios.delete(`${ServidorURL}/estudiantes/${id}`);
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
    // mostrar mencion
    const ShowMencion = async () => {
      await axios
        .get(`${ServidorURL}/mencion`)
        .then((res) => {
          console.log(res);
          setDatosMencion(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar seccion
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
    // mostrar año
    const ShowYear = async () => {
      await axios
        .get(`${ServidorURL}/anno`)
        .then((res) => {
          console.log(res);
          setDatosAnio(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowYear();
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
    id_seccion: "Selecciona:",
    id_year: "Selecciona:",
    id_mension: "Selecciona:"
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    if (names === "cedula" || names === "telefono" ) {
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
      id_seccion: "Selecciona:",
      id_year: "Selecciona:",
      id_mension: "Selecciona:"
    });
  };
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ServidorURL}/estudiantes`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("data = ",data)
      handleCloseModal();
      alert("Estudiante", "Registro exitoso!", "success");
    } catch (error) {
      switch (error.response && error.response.status) {
        case 409:
          alert(
            "Cedula repetida",
            `Esta cedula ya se encuentra registrada en el sistema`,
            "error"
          );
          break;
        case 408:
          alert(
            "Correo repetido",
            `Este correo electronico ya se encuentra registrado`,
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
                value={data.cedula}
                onChange={handleChange}
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
                  value={data.p_nombre}
                  onChange={handleChange}
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
                  value={data.s_nombre}
                  onChange={handleChange}
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
                value={data.p_apellido}
                onChange={handleChange}
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
                value={data.s_apellido}
                onChange={handleChange}
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
                value={data.telefono}
                onChange={handleChange}
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
                id="email"
                name="email"
                type="text"
                value={data.email}
                onChange={handleChange}
                placeholder="correo"
                required
                shadow
              />
            </div>
            {/*----- Seccion ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="seccion" value="Selecciona la Seccion" />
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
                  {datoSeccion.map((secciones) => (
                    <option
                      value={secciones.id_seccion}
                      key={secciones.id_seccion}
                    >
                      {secciones.seccion}
                    </option>
                  ))}
                </Select>
            </div>
            {/*----- Año ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_anno" value="Selecciona el Año" />
              </div>
              <Select
                id="id_year"
                name="id_year"
                value={data.id_year}
                onChange={handleChange}
              >
                <option value="Selecciona:" disabled>
                  Selecciona
                </option>
                {/* select que lleva los datos */}
                {datosAnio.map((anio) => (
                    <option
                      value={anio.id_anno}
                      key={anio.id_anno}
                    >
                      {anio.anno}
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
  // mostrar materias en select
  const [datosMencion, setDatosMencion] = useState([]);
  // mostrar años en select
  const [datosAnio, setDatosAnio] = useState([]);
  // mostrar seccion en select
  const [datoSeccion, setDatoSeccion] = useState([]);

  useEffect(() => {
    // mostrar mencion
    const ShowMencion = async () => {
      await axios
        .get(`${ServidorURL}/mencion`)
        .then((res) => {
          console.log(res);
          setDatosMencion(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar seccion
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
    // mostrar año
    const ShowYear = async () => {
      await axios
        .get(`${ServidorURL}/anno`)
        .then((res) => {
          console.log(res);
          setDatosAnio(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowYear();
    ShowMencion();
    ShowSeccion();
  }, []);

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
    id_seccion: "Selecciona:",
    id_year: "Selecciona:",
    id_mension: "Selecciona:"
  });

  // capturar eventos de inputs
  const handleChange = (e) => {
    let names = e.target.name;
    let values = e.target.value.toUpperCase();
    if (names === "cedula" || names === "telefono") {
      // Esto eliminará cualquier caracter que no sea un dígito
      values = values.replace(/[^0-9]/g, ""); 
    }
    setDatos({ ...datos, [names]: values });
  };
  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/estudiantes/${id}`);
    if (res.data.result[0]) {
      setDatos(res.data.result[0]);
    } else {
      console.error("No se pudo obtener los datos del estudiante");
    }
    setOpenModal(true);
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    
    alert("Campo vacio", "Debes ingresar todos los datos", "warning");
  
    try {
      
      await axios.put(`${ServidorURL}/estudiantes/${id}`, datos, {
        headers: { "Content-Type": "application/json" },
      });
      setOpenModal(false);
      alert("Estudiante", "Actualizado exitosamente!", "success");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(
          "Cedula repetida!",
          `Ya existe un usuario registrado con este número de cedula!`,
          "error"
        );
      } else if (error.response && error.response.status === 408){
        alert(
          "Email repetida!",
          `Ya existe un usuario registrado con ese correo electronico!`,
          "error"
        );
      } else {
        alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
      }
      return console.log(error);
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
                value={datos.cedula}
                onChange={handleChange}
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
                  value={datos.p_nombre}
                  onChange={handleChange}
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
                  value={datos.s_nombre}
                  onChange={handleChange}
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
                value={datos.p_apellido}
                onChange={handleChange}
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
                value={datos.s_apellido}
                onChange={handleChange}
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
                value={datos.telefono}
                onChange={handleChange}
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
                id="email"
                name="email"
                type="text"
                value={datos.email}
                onChange={handleChange}
                placeholder="correo"
                required
                shadow
              />
            </div>
            {/*----- Seccion ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="seccion" value="Selecciona la Seccion" />
              </div>
              {/* select de mencion */}
              <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={datos.id_seccion}
                  onChange={handleChange}
                >
                  {/* select por defecto, va didabled */}
                  <option value="Selecciona:" disabled>
                    Selecciona
                  </option>
                  {/* select que lleva los datos */}
                  {datoSeccion.map((secciones) => (
                    <option
                      value={secciones.id_seccion}
                      key={secciones.id_seccion}
                    >
                      {secciones.seccion}
                    </option>
                  ))}
                </Select>
            </div>
            {/*----- Año ------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id_anno" value="Selecciona el Año" />
              </div>
              <Select
                id="id_year"
                name="id_year"
                value={datos.id_year}
                onChange={handleChange}
              >
                <option value="Selecciona:" disabled>
                  Selecciona
                </option>
                {/* select que lleva los datos */}
                {datosAnio.map((anio) => (
                  <option
                    value={anio.id_anno}
                    key={anio.id_anno}
                  >
                    {anio.anno}
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
                  value={datos.id_mension}
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
      await axios.delete(`${ServidorURL}/notas`);
      alert("Notas eliminadas", "Notas eliminadas exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Error", "Error en la eliminación!", "error");
      setOpenModal(false);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm" className="h-10">
        Vaciar notas
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
              ¿Seguro de querer eliminar las notas?
            </h3>
            <p className="mb-5 text-sm font-normal text-gray-500">
              Si preciona ELIMINAR se eliminaran todas las notas de la base de datos
            </p>
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
export function EliminarNotasClase({ idClase, idLapso, datos, setDatos }) {
  const [openModal, setOpenModal] = useState(false);
  const handleEliminarNotas = async () => {
      try {
        if (!idClase || !idLapso || idLapso === "Seleccionar:") {
          alert(
            "Datos vacios!",
            "Por favor selecciona un lapso y una clase válida para eliminar.",
            "warning"
          );
          return;
        }
    
        const response = await axios.delete(`${ServidorURL}/notasDelete`, {
          data: {
            id_clase: idClase,
            id_lapso: idLapso,
          },
        });
    
        if (response.status === 200) {
          alert(
            "Notas eliminadas exitosamente.", 
            "Ah eliminado las notas de la sección", 
            "success");
          // Actualizar los datos en el frontend después de la eliminación
          const nuevosDatos = datos.filter(
            (estudiante) => estudiante.id_clase !== idClase || estudiante.lapsos[0] !== idLapso
          );
          setDatos(nuevosDatos); // Actualiza el estado de los alumnos
        }
      } catch (error) {
        console.error("Error al eliminar notas:", error);
        alert(
          "Error al eliminar",
          "Ocurrió un error al intentar eliminar las notas.",
          "error"
        );
      }
    };
  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="failure" size="sm">
        Borrar notas
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
              ¿Seguro de querer eliminar las notas?
            </h3>
            <p className="mb-5 text-sm font-normal text-gray-500">
              Si preciona ELIMINAR se eliminaran todas las notas del lapso
            </p>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleEliminarNotas}>
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
  // mostrar profesores en select
  const [datosProf, setDatosProf] = useState([]);
  // mostrar materias en select
  const [datosMaterias, setDatosMaterias] = useState([]);
  // mostrar menciones en select
  const [datosMencion, setDatosMencion] = useState([]);
  // mostrar años en select
  const [datosAnio, setDatosAnio] = useState([]);
  // mostrar seccion en select
  const [datoSeccion, setDatoSeccion] = useState([]);


  const [data, setData] = useState({
    id_user: "Selecciona:",
    id_seccion: "Selecciona:",
    id_anno: "Selecciona:",
    id_mension: "Selecciona:",
    id_materias: "Selecciona:"
  });
  const limpiarCampos = () => {
    setData({
      id_user: "Selecciona:",
      id_seccion: "Selecciona:",
      id_anno: "Selecciona:",
      id_mension: "Selecciona:",
      id_materias: "Selecciona:"
    });
  };

  useEffect(() => {
    // mostrar profesor
    const ShowProfesor = async () => {
      await axios
        .get(`${ServidorURL}/profesor`)
        .then((res) => {
          console.log(res);
          setDatosProf(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar materias
    const ShowMaterias = async () => {
      await axios
        .get(`${ServidorURL}/materias`)
        .then((res) => {
          console.log(res);
          setDatosMaterias(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar mencion
    const ShowMencion = async () => {
      await axios
        .get(`${ServidorURL}/mencion`)
        .then((res) => {
          console.log(res);
          setDatosMencion(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar seccion
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
    // mostrar año
    const ShowYear = async () => {
      await axios
        .get(`${ServidorURL}/anno`)
        .then((res) => {
          console.log(res);
          setDatosAnio(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowProfesor();
    ShowMaterias();
    ShowYear();
    ShowMencion();
    ShowSeccion();
  }, []);

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    setData({ ...data, [names]: value });
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    if (Object.values(data).some((field) => field.trim() === "")) {
      alert("Campo vacio", "Debes ingresar todos los datos", "warning");
    } else {
      try {
        // peticion de registro
        await PeticionAxios("clase", "post", data);
        // vaciar los campos al enviar el formulario
        limpiarCampos();
        setOpenModal(false);
        console.log("datos = ",data)
        // alerta de exito
        alert("Clase", "Registro exitoso!", "success");
      } catch (error) {
        // alerta de errores
        if (error.response && error.response.status === 409) {
          alert(
            "Clase dublicada",
            `Esta clase ya existe!`,
            "error"
          );
        } else if (error.response && error.response.status === 408) {
          alert(
            "Clase asignada",
            `Esta clase ya esta asignada a otro profesor!`,
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
                    id="id_user"
                    name="id_user"
                    value={data.id_user}
                    onChange={handleChange}
                  >
                    <option value="Selecciona:" disabled>
                      Selecciona:
                    </option>
                    {datosProf.map((profesor) => (
                      <option 
                        value={profesor.id_usuario}
                        key={profesor.id_usuario}
                      >
                        {[profesor.cedula," ",profesor.p_nombre," ",profesor.p_apellido]}
                      </option>
                    ))}
                    </Select>
              </div>
              {/* ------ materia --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="materia" value="Materia:" />
                </div>
                <Select
                  id="id_materias"
                  name="id_materias"
                  value={data.id_materias}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  {datosMaterias.map((materia) => (
                    <option 
                      value={materia.id_materia}
                      key={materia.id_materia}
                    >
                      {materia.materia}
                    </option>
                  ))}
                </Select>
              </div> 
              {/* ------ año --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="año" value="Año:" />
                </div>
                <Select
                  id="id_anno"
                  name="id_anno"
                  value={data.id_anno}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  {datosAnio.map((year) => (
                    <option 
                      value={year.id_anno}
                      key={year.id_anno}
                    >{year.anno}</option>
                  ))}
                </Select>
              </div>            
              {/* ------ seccion --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="seccion" value="Seccion:" />
                </div>
                <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={data.id_seccion}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
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
              {/* ------ mencion --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mencion" value="Mencion:" />
                </div>
                <Select
                  id="id_mension"
                  name="id_mension"
                  value={data.id_mension}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
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
      await axios.delete(`${ServidorURL}/clase/${id}`, {
        withCredentials: true,
      });
      // alerta de exito
      alert("Clase", "Eliminada exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      switch (error.response && error.response.status) {
        case 400:
          alert("Imposible", "No puedes eliminar esta clase!", "warning");
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
  // mostrar profesores en select
  const [datosProf, setDatosProf] = useState([]);
  // mostrar materias en select
  const [datosMaterias, setDatosMaterias] = useState([]);
  // mostrar menciones en select
  const [datosMencion, setDatosMencion] = useState([]);
  // mostrar años en select
  const [datosAnio, setDatosAnio] = useState([]);
  // mostrar seccion en select
  const [datoSeccion, setDatoSeccion] = useState([]);

  // cerrar modal
  const handleCloseModal = () => {
    limpiarCampos();
    setOpenModal(false);
  };
  // mostrar los datos en los inputs
  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/clase/${id}`);
    if (res.data[0]) {
      setData(res.data[0]);
    } else {
      alert("Error al mostrar los datos", "Ocurrio un error al intentar mostrar los datos", "warning")
      console.error("No se pudo obtener los datos de la clase");
    }
    setOpenModal(true);
  };

  const [data, setData] = useState({
    id_user: "Selecciona:",
    id_seccion: "Selecciona:",
    id_anno: "Selecciona:",
    id_mension: "Selecciona:",
    id_materias: "Selecciona:"
  });
  const limpiarCampos = () => {
    setData({
      id_user: "Selecciona:",
      id_seccion: "Selecciona:",
      id_anno: "Selecciona:",
      id_mension: "Selecciona:",
      id_materias: "Selecciona:"
    });
  };

  useEffect(() => {
    // mostrar profesor
    const ShowProfesor = async () => {
      await axios
        .get(`${ServidorURL}/profesor`)
        .then((res) => {
          console.log(res);
          setDatosProf(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar materias
    const ShowMaterias = async () => {
      await axios
        .get(`${ServidorURL}/materias`)
        .then((res) => {
          console.log(res);
          setDatosMaterias(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar mencion
    const ShowMencion = async () => {
      await axios
        .get(`${ServidorURL}/mencion`)
        .then((res) => {
          console.log(res);
          setDatosMencion(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // mostrar seccion
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
    // mostrar año
    const ShowYear = async () => {
      await axios
        .get(`${ServidorURL}/anno`)
        .then((res) => {
          console.log(res);
          setDatosAnio(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    ShowProfesor();
    ShowMaterias();
    ShowYear();
    ShowMencion();
    ShowSeccion();
  }, []);

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value;
    setData({ ...data, [names]: value });
  };
  // enviar datos al servidor
  const handleSend = async (e) => {
    e.preventDefault();
    // validar que los campos no esten vacios
    try {
      await axios.put(`${ServidorURL}/clase/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      setOpenModal(false);
      limpiarCampos();
      alert("Clase", "Actualizado exitosamente!", "success");
    } catch (error) {
      // alerta de errores
      if (error.response && error.response.status === 409) {
        alert(
          "Clase dublicada",
          `Esta clase ya existe!`,
          "error"
        );
      } else if (error.response && error.response.status === 408) {
        alert(
          "Clase asignada",
          `Esta clase ya esta asignada a otro profesor!`,
          "error"
        );
      } else {
        alert("Oops...", `Ha ocurrido un error! ${error}`, "error");
      }
      return console.log(error);
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
          <Modal.Header>Modificar Clase</Modal.Header>
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
                    id="id_user"
                    name="id_user"
                    value={data.id_user}
                    onChange={handleChange}
                  >
                    <option value="Selecciona:" disabled>
                      Selecciona:
                    </option>
                    {datosProf.map((profesor) => (
                      <option 
                        value={profesor.id_usuario}
                        key={profesor.id_usuario}
                      >
                        {[profesor.cedula," ",profesor.p_nombre," ",profesor.p_apellido]}
                      </option>
                    ))}
                    </Select>
              </div>
              {/* ------ materia --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="materia" value="Materia:" />
                </div>
                <Select
                  id="id_materias"
                  name="id_materias"
                  value={data.id_materias}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  {datosMaterias.map((materia) => (
                    <option 
                      value={materia.id_materia}
                      key={materia.id_materia}
                    >
                      {materia.materia}
                    </option>
                  ))}
                </Select>
              </div> 
              {/* ------ año --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="año" value="Año:" />
                </div>
                <Select
                  id="id_anno"
                  name="id_anno"
                  value={data.id_anno}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
                  {datosAnio.map((year) => (
                    <option 
                      value={year.id_anno}
                      key={year.id_anno}
                    >{year.anno}</option>
                  ))}
                </Select>
              </div>            
              {/* ------ seccion --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="seccion" value="Seccion:" />
                </div>
                <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={data.id_seccion}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
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
              {/* ------ mencion --------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mencion" value="Mencion:" />
                </div>
                <Select
                  id="id_mension"
                  name="id_mension"
                  value={data.id_mension}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>
                    Selecciona:
                  </option>
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
                  id="mension"
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

// modal evaluacion
export function ModalEvaluacion() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    evaluacion: ""
  });

  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    setData({ ...data, [names]: value });
  };
  // limpiar campos del formulario
  const limpiarCampos = () => {
    setData({
      evaluacion: ""
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
    if (data.evaluacion.trim() === "") {
      alert("Campo vacio", "Debes llenar todos los campos", "warning");
    } else {
      try {
        await axios.post(`${ServidorURL}/evaluacion/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseModal();
        alert("Evaluacion", "Registro exitoso!", "success");
      } catch (error) {
        switch (error.response && error.response.status) {
          case 409:
            alert(
              "Evaluacion existente",
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
          Registrar Evaluacion
        </Button>
        <Modal show={openModal} onClose={handleCloseModal}>
          <Modal.Header>Registrar Evaluacion</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full uppercase"
              onSubmit={handleSend}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="evaluacion" value="Evaluacion:" />
                </div>
                <TextInput
                  id="id_evaluacion"
                  type="text"
                  placeholder="Nombre de la Evaluacion"
                  name="evaluacion"
                  shadow
                  className="uppercase"
                  onChange={handleChange}
                  value={data.evaluacion}
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
// modal eliminar evaluacion
export function EliminarEvaluacion({ id }) {
  const [openModal, setOpenModal] = useState(false);

  const deleteEvaluacion = async () => {
    try {
      const res = await axios.delete(`${ServidorURL}/evaluacion/${id}`);
      alert("Evaluacion", "Eliminado exitosamente!", "success");
      setOpenModal(false);
    } catch (error) {
      console.error("error", error);
      alert("Evaluacion", "Error en la eliminación!", "error");
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
              Estas seguro de querer eliminar esta Evaluacion?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteEvaluacion}>
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
// modal editar evaluacion
export function EditarEvaluacion({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({
    evaluacion: ""
  });
  const handleChange = (e) => {
    let names = e.target.name;
    let value = e.target.value.toUpperCase();
    setDatos({ ...datos, [names]: value });
  
  };

  // actualizar
  const actualizar = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`${ServidorURL}/evaluacion/${id}`, { 
        evaluacion: datos.evaluacion
       });
      setOpenModal(false);
      alert("Evaluacion", "Actualización exitososa!", "success");
    } catch (error) {
      console.log(`Error = ${error}`);
      alert("Evaluacion", "Error al actualizar", "error");
    }
    
  };

  const handleOpenModal = async () => {
    const res = await axios.get(`${ServidorURL}/evaluacion/${id}`);
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
          <Modal.Header>Editar Evaluacion</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4 max-w-full"
              onSubmit={actualizar}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Evaluacion" value="Evaluacion:" />
                </div>
                <TextInput
                  id="evaluacion"
                  type="text"
                  placeholder="Evaluacion"
                  onChange={handleChange}
                  name="evaluacion"
                  value={datos.evaluacion}
                  shadow
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
// filtrar clases
export function FiltrarClases({onFilter, dataClases, filteredData, materia, setMateria,}) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
      id_anno: "Selecciona:",
      id_seccion: "Selecciona:",
      id_mension: "Selecciona:"
  });

  const limpiarFiltros = () => {
    setData({
      id_anno: "Selecciona:",
      id_seccion: "Selecciona:",
      id_mension: "Selecciona:"
    });
    onFilter([]); // Limpia los resultados en la tabla
  };

  // Manejar cambios en los selectores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  // Solicitar los estudiantes filtrados al backend
  const aplicarFiltro = async () => {
    if (data.id_anno !== "Selecciona:" && data.id_seccion !== "Selecciona:" && data.id_mension !== "Selecciona:") {
      try {
        const res = await axios.get(`${ServidorURL}/estudiantes?`, {
          params: {
            anno: data.id_anno,
            seccion: data.id_seccion,
            mension: data.id_mension,
            _: new Date().getTime()
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (res.data.length === 0) {
          alert(
            "Campos Vacios!",
            "No se encontraron estudiantes para los filtros seleccionados.", 
            "warning"
          );
        }
        console.log("Datos enviados desde FiltrarClases:", res.data);
        onFilter(res.data); // Envía los estudiantes filtrados al componente padre
      } catch (error) {
        console.error("Error al aplicar el filtro:", error);
      }
    } else {
      alert("Por favor selecciona todos los filtros.");
    }
  };

  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)} className="m-auto">
          Buscar Clase
        </Button>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          position="top-center"
        >
          <Modal.Header>Seleccionar Clase</Modal.Header>
          <Modal.Body>
            <form className="flex flex-col gap-4">
              {/* Selector de Materias */}
              <div>
                <Label htmlFor="id_materia" value="Materia:" />
                <Select
                  id="id_materia"
                  name="id_materia"
                  value={materia}
                  onChange={(e) => {
                    setMateria(e.target.value)
                  }}
                >
                  <option value="Seleccionar:" disabled>Selecciona:</option>
                  {
                    dataClases.clases && dataClases.clases.length > 0 ? (
                      dataClases.clases.map((clase, index) => (
                      <option value={clase.id_materia} key={index}>
                        {clase.materia}
                      </option>
                      ))
                    ) : (
                      <option disabled>No hay materias disponibles</option>
                    )
                  }
                </Select>
              </div>
              {/* Selector de Año */}
              <div>
                <Label htmlFor="id_anno" value="Año:" />
                <Select
                  id="id_anno"
                  name="id_anno"
                  value={data.id_anno}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>Selecciona:</option>
                  {
                    filteredData.anio && filteredData.anio.length > 0 ? (
                      filteredData.anio.map((clase, index) => (
                      <option value={clase.id_anno} key={index}>
                        {clase.anno}
                      </option>
                      ))
                    ) : (
                      <option disabled>No hay años disponibles</option>
                    )
                  }
                </Select>
              </div>
              {/* Selector de Sección */}
              <div>
                <Label htmlFor="id_seccion" value="Sección:" />
                <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={data.id_seccion}
                  onChange={handleChange}
                  disabled={data.id_seccion.length === 0}
                >
                  <option value="Selecciona:" disabled>Selecciona:</option>
                  {
                    filteredData.secciones && filteredData.secciones.length > 0 ? (
                      filteredData.secciones.map((clase, index) => (
                      <option value={clase.id_seccion} key={index}>
                        {clase.seccion}
                      </option>
                      ))
                    ) : (
                      <option disabled>No hay años disponibles</option>
                    )
                  }
                </Select>
              </div>
              {/* Selector de Mención */}
              <div>
                <Label htmlFor="id_mension" value="Mención:" />
                <Select
                  id="id_mension"
                  name="id_mension"
                  value={data.id_mension}
                  onChange={handleChange}
                  disabled={data.id_mension.length === 0}
                >
                  <option value="Selecciona:" disabled>Selecciona:</option>
                  {
                    filteredData.menciones && filteredData.menciones.length > 0 ? (
                      filteredData.menciones.map((clase, index) => (
                      <option value={clase.id_mension} key={index}>
                        {clase.mension}
                      </option>
                      ))
                    ) : (
                      <option disabled>No hay años disponibles</option>
                    )
                  }
                </Select>
              </div>
              {/* Botones de Aplicar y Limpiar */}
              <div className="flex gap-4 justify-center">
                <Button color="warning" onClick={aplicarFiltro}>
                  Aplicar Filtro
                </Button>
                <Button color="dark" onClick={limpiarFiltros}>
                  Limpiar Filtros
                </Button>
              </div>
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
export function FiltrarEstudiantes({onFilter}) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
      id_anno: "Selecciona:",
      id_seccion: "Selecciona:",
      id_mension: "Selecciona:"
  });
  const [dataSeccion, setDataSeccion] = useState([]);
  const [dataAnno, setDataAnno] = useState([]);
  const [dataMencion, setDataMencion] = useState([]);

 useEffect(() => {
     const fetchData = async () => {
       try {
         const [reccionRes, annoRes, mencionRes ] = await Promise.all([
           axios.get(`${ServidorURL}/seccion`),
           axios.get(`${ServidorURL}/anno`),
           axios.get(`${ServidorURL}/mencion`)
         ]);
         setDataSeccion(reccionRes.data);
         setDataAnno(annoRes.data);
         setDataMencion(mencionRes.data);
       } catch (error) {
         console.error("Error al obtener datos iniciales:", error);
       }
     };
     fetchData();
   }, []);

  const limpiarFiltros = () => {
    setData({
      id_anno: "Selecciona:",
      id_seccion: "Selecciona:",
      id_mension: "Selecciona:"
    });
    // Limpia los resultados en la tabla
    onFilter([]);
  };

  // Manejar cambios en los selectores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  // Solicitar los estudiantes filtrados al backend
  const aplicarFiltro = async () => {
    if (data.id_anno !== "Selecciona:" && data.id_seccion !== "Selecciona:" && data.id_mension !== "Selecciona:") {
      try {
        const res = await axios.get(`${ServidorURL}/estudiantes?`, {
          params: {
            anno: data.id_anno,
            seccion: data.id_seccion,
            mension: data.id_mension,
            _: new Date().getTime()
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
        onFilter(res.data); // Envía los estudiantes filtrados al componente padre
      } catch (error) {
        console.error("Error al aplicar el filtro:", error);
      }
    } else {
      alert("Por favor selecciona todos los filtros.");
    }
  };

  return (
    <Container>
      <>
        <Button onClick={() => setOpenModal(true)} className="m-auto">
          Buscar Clase
        </Button>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          position="top-center"
        >
          <Modal.Header>Seleccionar Clase</Modal.Header>
          <Modal.Body>
            <form className="flex flex-col gap-4">
              {/* Selector de Año */}
              <div>
                <Label htmlFor="id_anno" value="Año:" />
                <Select
                  id="id_anno"
                  name="id_anno"
                  value={data.id_anno}
                  onChange={handleChange}
                >
                  <option value="Selecciona:" disabled>Selecciona:</option>
                  {dataAnno.map((clase, index) => (
                    <option value={clase.id_anno} key={index}>
                      {clase.anno}
                    </option>
                  ))}
                </Select>
              </div>
              {/* Selector de Sección */}
              <div>
                <Label htmlFor="id_seccion" value="Sección:" />
                <Select
                  id="id_seccion"
                  name="id_seccion"
                  value={data.id_seccion}
                  onChange={handleChange}
                  disabled={data.id_seccion.length === 0}
                >
                  <option value="Selecciona:" disabled>Selecciona:</option>
                  {dataSeccion.map((clase, index) => (
                    <option value={clase.id_seccion} key={index}>
                      {clase.seccion}
                    </option>
                  ))}
                </Select>
              </div>
              {/* Selector de Mención */}
              <div>
                <Label htmlFor="id_mension" value="Mención:" />
                <Select
                  id="id_mension"
                  name="id_mension"
                  value={data.id_mension}
                  onChange={handleChange}
                  disabled={data.id_mension.length === 0}
                >
                  <option value="Selecciona:" disabled>Selecciona:</option>
                  {dataMencion.map((clase, index) => (
                    <option value={clase.id_mension} key={index}>
                      {clase.mension}
                    </option>
                  ))}
                </Select>
              </div>
              {/* Botones de Aplicar y Limpiar */}
              <div className="flex gap-4 justify-center">
                <Button color="warning" onClick={aplicarFiltro}>
                  Aplicar Filtro
                </Button>
                <Button color="dark" onClick={limpiarFiltros}>
                  Limpiar Filtros
                </Button>
              </div>
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







// registrar nota
export function RegistroNotas({idLapso, idEvaluacion, idClase, estudiantes}) {
  const [openModal, setOpenModal] = useState(false);
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    if (!openModal || estudiantes.length === 0) return;
    console.log("Datos enviados al modal:", estudiantes);
    console.log("id_clase",idClase);
    setNotas(
      estudiantes.map((estudiante) => ({
        id_estudiante: estudiante.id_estudiante,
        nota: estudiante.nota || "",
      }))
    );
  }, [estudiantes, openModal]);
  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e, id_estudiante) => {
    const nuevaNota = e.target.value;
    setNotas((prevNotas) =>
      prevNotas.map((item) =>
        item.id_estudiante === id_estudiante ? { ...item, nota: nuevaNota } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (notas.some((nota) => nota.nota === "" || nota.nota < 0 || nota.nota > 20)){
      alert(
        "Notas vacias",
        "Asegúrate de que todas las notas sean válidas (entre 0 y 20)",
        "warning"
      );
      return;
    } else if (idClase === "" || !idClase) {
      alert(
        "Clase vacia",
        "Asegúrate de que escoger una clase",
        "warning"
      );
      return;
    } else if (idEvaluacion === "Seleccionar:" || !idEvaluacion) {
      alert(
        "Evaluacion vacia",
        "Asegúrate de que escoger una evaluación",
        "warning"
      );
      return;
    } else if (idLapso === "Seleccionar:" || !idLapso) {
      alert(
        "Lapso vacio",
        "Asegúrate de que escoger un lapso",
        "warning"
      );
      return;
    }
    
    try {
      
      for (const nota of notas) {
        await axios.post(`${ServidorURL}/notas`, {
          estudiante: nota.id_estudiante,
          nota: nota.nota,
          id_clase: parseInt(idClase, 10),
          evaluacion: parseInt(idEvaluacion, 10),
          id_lapso: parseInt(idLapso, 10)
        });
      }
      alert(
        "Registrado!",
        "Notas registradas con éxito",
        "success"
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error al enviar las notas:", error);
      alert(
        "Error",
        "Hubo un error al registrar las notas",
        "error"
      );
    }
  };

  return (
    <Container>
      <>
        <Button 
          color="warning" 
          onClick={() => setOpenModal(true)}
        >
          Registrar Nota
        </Button>
        <Modal
          show={openModal}
          onClose={handleCloseModal}
          position="top-center"
        >
          <Modal.Header>Registrar Mencion</Modal.Header>
          <Modal.Body>
          {(!estudiantes || estudiantes.length === 0) ? (
            <p className="text-center">Selecciona una clase para filtrar los datos.</p>
          ) : (
            <table className="w-full mb-4 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Estudiante</th>
                  <th className="py-2 text-left">Nota</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((estudiante) => {
                  // Buscamos en el array de "notas" la entrada correspondiente a este estudiante.
                  const notaObj = notas.find(
                    (nota) => nota.id_estudiante === estudiante.id_estudiante
                  );
                  return (
                    <tr key={estudiante.id_estudiante} className="border-b">
                      <td className="py-2">
                        {estudiante.p_nombre} {estudiante.p_apellido}
                      </td>
                      <td className="py-2">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={notaObj ? notaObj.nota : ""}
                          onChange={(e) =>
                            handleChange(e, estudiante.id_estudiante)
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleSubmit}>
              Guardar Notas
            </Button>
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
