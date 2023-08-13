import React, { useState } from "react";
import { FiFrown } from "react-icons/fi";
import "./CustomAlert.css"; // Importar el archivo CSS para los estilos

function CustomAlert({ message, onClose }) {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content button">
        <span class="liquid"></span>
        <p className="btn-txt">{message}</p>
        <button onClick={onClose} className="Acept"><FiFrown/></button>
      </div>
    </div>
  );
}

export default CustomAlert;
