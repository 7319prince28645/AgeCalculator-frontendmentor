import "./App.css";
import "./index.css";
import CustomAlert from "./Alert";
import React, { useState, useEffect } from "react";
import {
  parse,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";
function App() {
  const [hrAdded, setHrAdded] = useState(false);

  useEffect(() => {
    const addHrAfterButton = () => {
      if (window.innerWidth < 450 && !hrAdded) {
        const hrElement = document.createElement('hr');
        const buttonElement = document.querySelector('.buttonAcept'); // Selecciona el botón por la clase
        if (buttonElement) {
          buttonElement.parentNode.insertBefore(hrElement, buttonElement.nextSibling);
          setHrAdded(true);
        }
      } else if (window.innerWidth >= 450 && hrAdded) {
        // Si el ancho del viewport vuelve a ser mayor a 450px, quita el <hr> si se agregó previamente
        const hrElement = document.querySelector('hr');
        if (hrElement) {
          hrElement.parentNode.removeChild(hrElement);
          setHrAdded(false);
        }
      }
    };

    // Agregar un listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', addHrAfterButton);

    // Limpieza del efecto
    return () => {
      window.removeEventListener('resize', addHrAfterButton);
    };
  }, [hrAdded]);
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
    show: false,
  });
  const [show, setShow] = useState(false);
  const handleCloseAlert = () => {
    setShow(false);
  };

  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      if (field === "day") {
        // Validar día: máximo 31
        if (
          newValue === "" ||
          (parseInt(newValue) >= 1 && parseInt(newValue) <= 31)
        ) {
          setDate((prevDate) => ({
            ...prevDate,
            [field]: newValue,
          }));
        }
      } else if (field === "month") {
        // Validar mes: máximo 12
        if (
          newValue === "" ||
          (parseInt(newValue) >= 1 && parseInt(newValue) <= 12)
        ) {
          setDate((prevDate) => ({
            ...prevDate,
            [field]: newValue,
          }));
        }
      } else if (field === "year") {
        const currentYear = new Date().getFullYear();
        // Validar año: no mayor al año actual
        if (newValue === "" || parseInt(newValue) <= currentYear) {
          setDate((prevDate) => ({
            ...prevDate,
            [field]: newValue,
          }));
        }
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(!show);
    setDate((prevDate) => ({
      ...prevDate,
      show: true,
    }));
  };

  const calculateAge = () => {
    const currentDate = new Date();
    const inputDate = parse(
      `${date.year}-${date.month}-${date.day}`,
      "yyyy-M-d",
      new Date()
    );

    const years = differenceInYears(currentDate, inputDate);
    const months = differenceInMonths(currentDate, inputDate) % 12;
    const days = differenceInDays(currentDate, inputDate) % 31;

    return { years, months, days };
  };

  const age = calculateAge();

  return (
    <div className="contenedor">
      <form action="" onSubmit={handleSubmit}>
        <div className="spanPrincipal">
          <span className="spanclass">
            <label htmlFor="day">DAY</label>
            <input
              type="text"
              name="day"
              id="day"
              placeholder="DD"
              value={date.day}
              onChange={(e) => handleInputChange(e, "day")}
              required
            />
          </span>
          <span className="spanclass">
            <label htmlFor="month">MONTH</label>
            <input
              type="text"
              name="month"
              id="month"
              placeholder="MM"
              value={date.month}
              onChange={(e) => handleInputChange(e, "month")}
              required
            />
          </span>
          <span className="spanclass">
            <label htmlFor="year">YEAR</label>
            <input
              type="text"
              name="year"
              placeholder="YYYY"
              value={date.year}
              onChange={(e) => handleInputChange(e, "year")}
              required
            />
          </span>
        </div>
        <span className="separador">
          <hr />
          <button className="buttonAcept"></button>
        </span>
      </form>
      <div className="muestra">
        <p>
          <b>{date.show ? age.years : "- -"}</b> years
        </p>
        <p>
          <b> {date.show ? age.months : "- -"}</b>months
        </p>
        <p>
          <b> {date.show ? age.days : "- -"} </b>days
        </p>
      </div>
      {show && (
        <CustomAlert message="YA ESTAS VIEJILLA" onClose={handleCloseAlert} />
      )}
    </div>
  );
}

export default App;
