import styled from "styled-components";
import "../css/output.css";
import logo from"../assets/img/logo.jpg";
import "../css/login.css";
import { HiLockClosed, HiUser } from "react-icons/hi";
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
          texto="Administracion" 
          descripcion="hacer de secretaria porq si XD" 
          imag={Imagenes.imagen1}
        />

        <TarjetaMension 
          estilo="red"
          texto="Informatica" 
          descripcion="Arreglar canaimitas con güindous siete" 
          imag={Imagenes.imagen2}
        />
        <TarjetaMension
          estilo="rgb(132, 18, 30)"
          texto="Servicio de enfermeria super especial purucito" 
          descripcion="hacer de secretaria porq si XD" 
          imag={Imagenes.imagen2}
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
  flex-direction: column
`;

export default Login;
