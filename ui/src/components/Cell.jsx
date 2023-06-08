import PropTypes from "prop-types";
import { useState } from "react";
import { checkValueValidity } from "../services/sudokuService";

const Cell = ({ cell, row, col, onChange }) => {
  const { value, readOnly } = cell;
  const [isValid, setValid] = useState(true);

  const handleChange = async (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const sanitizedValue = inputValue;

    if (sanitizedValue.length <= 1) {
      if (sanitizedValue !== "") {
        const isValid = await checkValueValidity(row, col, sanitizedValue);
        setValid(isValid);
      }
      onChange(sanitizedValue);
    }
  };

  return (
    <input
      type='number'
      min='1'
      max='9'
      value={value}
      readOnly={readOnly}
      onChange={handleChange}
      inputMode='numeric'
      style={{
        background: readOnly ? "#c69c72" : "#c0b7b1",
        fontSize: "2rem",
        color: isValid ? "#433e3f" : "tomato",
        outline: "none",
        border: "none",
        textAlign: "center",
      }}
    />
  );
};

export default Cell;

Cell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    readOnly: PropTypes.bool.isRequired,
  }).isRequired,
  row: PropTypes.number,
  col: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
