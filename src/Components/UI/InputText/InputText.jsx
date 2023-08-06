import React from "react";

const InputText = ({ children, name, fun, value, placeHolder }) => {
  return (
    <div className="InputText">
      <label htmlFor={children} className="InputText__label">
        {children}
      </label>
      <input
        id={children}
        type="text"
        name={name}
        placeholder={placeHolder}
        className="form-control form-control-lg"
        value={value}
        onChange={(e) => fun(e)}
      />
    </div>
  );
};

export default InputText;
