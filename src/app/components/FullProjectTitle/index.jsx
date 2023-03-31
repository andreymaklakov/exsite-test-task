import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IconButton, TextField } from "@mui/material";
import {
  CreateOutlined as PenIcon,
  SaveOutlined as SaveIcon,
} from "@mui/icons-material";

import cn from "classnames";

import { changeProjectTitle } from "../../store/projects";

import styles from "./FullProjectTitle.module.scss";

const FullProjectTitle = ({ project, onSave }) => {
  const [changeActive, setChangeActive] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
    }
  }, [project]);

  const titleStyles = cn({
    [styles.title_hide]: changeActive,
  });
  const inputStyles = cn({
    [styles.input_hide]: !changeActive,
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (changeActive) {
      dispatch(changeProjectTitle({ title, id: project.id }));
    }
    setChangeActive((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <h1 className={styles.title}>
      <IconButton onClick={onSave}>
        <SaveIcon />
      </IconButton>

      <span className={titleStyles}>{title}</span>

      <form onSubmit={handleClick}>
        <TextField
          className={inputStyles}
          value={title}
          onChange={handleChange}
        />

        <IconButton disabled={!title} type="submit">
          <PenIcon />
        </IconButton>
      </form>
    </h1>
  );
};

export default FullProjectTitle;
