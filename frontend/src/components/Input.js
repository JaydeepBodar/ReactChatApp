import { FormLabel, TextField, Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import "./Input.css";
const Input = ({ label, type, onChange, name, value, onBlur, className,placeholder,onKeyDown }) => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Box
        variant="div"
        className={
          location.pathname === "/chat" ? "new-form-group" : "form-group"
        }
      >
        <FormLabel className="label">{label}</FormLabel>
        <TextField
          onKeyDown={onKeyDown}
          type={type}
          onChange={onChange}
          name={name}
          className={className}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
        />
      </Box>
    </React.Fragment>
  );
};

export default Input;
