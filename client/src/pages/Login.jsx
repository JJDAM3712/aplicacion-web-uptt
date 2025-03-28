import styled from "styled-components";
import "../css/output.css";
import "../css/login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alert } from "../utils/generic"
import { ServidorURL } from "../config/config";
import { useAuth } from "../auth/AuthProvided";
import { HomePage } from "./principal";
import { TarjetaMension } from "../components/mansion";
import "../css/st.css";
import Imagenes from "../assets/imagenes";


function Login() {
  const [datos, setDatos] = useState({
    usuario: "",
    password: "",
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

  const handleSend = async (e) => {
    e.preventDefault();

    try {
      if (datos.usuario.trim() === "" && datos.password.trim() === "") {
        alert("Campo vacio","Debes ingresar todos los datos","warning");
      } else {
        const res = await axios.post(`${ServidorURL}/login`, datos, {
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
      if (error.response && error.response.status === 401) {
        alert("Oops...",`Usuario o contraseña incorerctos!`,"error");
      } else {
        alert("Oops...",`Ha ocurrido un error! ${error}`,"error");
      }
      return console.log(error);
    }
  };

  return (
    <Container>
      <HomePage />

      <div className="tarjetasDeMension">

        <TarjetaMension 
          estilo="rgb(51, 169, 204)" 
          texto="Profesional en Telemática" 
          descripcion="El Profesional formado en la mención de Telemática estará preparado para desempeñarse por cuenta propia u ocupando un puesto de trabajo en el sector comercial o administrativo, específicamente relacionado al manejo eficiente de equipos de información  y telecomunicaciones." 
          imag={Imagenes.imagen1}
        />

        <TarjetaMension 
          estilo="red"
          texto="Profesional  en  Deporte y Recreación" 
          descripcion="El Profesional  en  Deporte y Recreación debe estar preparado para desempeñarse en diversos contextos educativos, promoviendo no solo la actividad física, sino también una cultura de salud y bienestar integral en la comunidad." 
          imag={Imagenes.imagen2}
        />
        <TarjetaMension
          estilo="rgb(132, 18, 30)"
          texto="Profesional en Laboratorio Clínico" 
          descripcion="El Profesional en Laboratorio Clínico es un profesional de carrera corta con alto sentido, capacitado para el desempeño eficiente de las funciones y tareas propias en el Laboratorio Clínico, donde su función principal es ayudar y facilitar el trabajo del Licenciado en Bioanálisis. " 
          imag={Imagenes.imagen3}
        />
           <TarjetaMension
          estilo="rgb(132, 18, 30)"
          texto="Profesional en  Farmacia." 
          descripcion="El asistente de farmacia desempeña un papel crucial en el sistema de salud, actuando como un puente entre los pacientes y los medicamentos." 
          imag={Imagenes.imagen4}
        />
      </div>
      

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  flex-direction: column;
`;

export default Login;
