import "../css/st.css"


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