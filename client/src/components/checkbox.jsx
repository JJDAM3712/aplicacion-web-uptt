import React, { useState } from "react";

const CheckboxVeri = () => {
  const [marcado, setMarcado] = useState(false);

  const manejarCambio = (e) => {
    setMarcado(e.target.checked);
  };

  return (
    <div style={{       
      display: "flex",
      justifyContent: "center",
        }}>
      <label>
        <input 
          type="checkbox" 
          checked={marcado} 
          onChange={manejarCambio} 
        />
      </label>
    </div>
  );
};

export default CheckboxVeri;