import React from "react";

import { TextField, Button } from "@mui/material";

import styles from "./InputForm.module.scss";

const InputForm = ({
  onChange,
  inputValue,
  onSubmit,
  placeholder,
  label,
  name,
}) => {
  const handleChange = (e) => {
    onChange((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <TextField
        className={styles.input}
        value={inputValue}
        onChange={handleChange}
        label={label}
        name={name}
        variant="outlined"
        placeholder={placeholder}
      />
      <Button
        className={styles.button}
        disabled={!inputValue}
        variant="contained"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export default InputForm;
