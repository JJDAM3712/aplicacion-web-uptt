import "../css/buscador.css";
import { useState } from "react";

export const Buscador = ({data, onSearch}) => {
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);

        // Filtrar datos segun el texto
        const filterData = data.filter((item) =>
            Object.values(item).some((val) =>
                val && String(val).toUpperCase().includes(value.toUpperCase())
            )
        );
        onSearch(filterData);
    }
    return (
        <div className="content_search">
            <input 
                type="text"
                placeholder="Buscar"
                className="input_search"
                value={search}
                onChange={handleSearch}
            />
        </div>
    )
}