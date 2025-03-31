import "../css/st.css"
import {
    AiFillFacebook, AiOutlineMail
  } from "react-icons/ai";


export const TarjetaMension = (props) => {
    const color = {
        backgroundColor: props.estilo
    }

    return (
        <div className="tarjeta_mension">
            <h3 className="titulo_mension" style={color}>{props.texto}</h3>
            <div className="mension_conten">
                <p className="descripcion_mension">{props.descripcion}</p>
                <div className="img_mension">
                    <img src={props.imag} className="mension_img" />
                </div>
            </div>
        </div>
    );
}

export const DivisionPag = (props) => {
    return (
        <div className="titleBar">
            <h1>{props.texto}</h1>
        </div>
    )
}

export const FooterPag = () => {
    return (
        <footer className="content_footer">
            <div className="contacto">
                <div className="facebook">
                    <a href="#" alt="FaceBook de la institución">
                        <AiFillFacebook style={{color:"#3b5998"}} className="icono_foo"/>
                        <h3>FaceBook</h3>
                    </a>
                </div>
                <div className="correo">
                    <a href="#" alt="Correo electronico de la institución">
                        <AiOutlineMail style={{color:"violet"}} className="icono_foo"/>
                        <h3>Correo</h3>
                    </a>
                </div>
            </div>

            <div className="text_footer">
                <p>Todos los derechos reservados </p>
                <p className="title">© Copyright</p>
            </div>
            
        </footer>
    )
}