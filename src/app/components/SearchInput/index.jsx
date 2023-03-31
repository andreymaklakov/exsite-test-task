import React from "react";

import { TextField } from "@mui/material";

import styles from "./SearchInput.module.scss";

const SearchInput = ({ value, onChange }) => {
  return (
    <TextField
      className={styles.search_input}
      placeholder="Search for todo..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
