import {HiOutlineSearch } from "react-icons/hi";
import "../css/buscador.css";

export const Buscador = () => {
    return (
        <div className="content_search">
            <input 
                type="text"
                placeholder="Buscar"
                className="input_search"
            />
            <button className="buton_seach">
                <HiOutlineSearch />
            </button>
        </div>
    )
}