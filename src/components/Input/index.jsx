import React from "react";

const Input = (props) => {
  const {
    name, value, placeholder, onChange, required
  } = props;

  return (
    <input
      className="Input"
      type="text"
      placeholder={`${placeholder}${required ? ' *' : ''}`}
      name={name}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
}

export default Input;
