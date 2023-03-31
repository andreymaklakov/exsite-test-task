import React from "react";
import { useDispatch } from "react-redux";

import { IconButton, Paper } from "@mui/material";
import { DeleteOutlined as DeleteIcon } from "@mui/icons-material";

import { deleteProject } from "../../store/projects";
import { deleteProjectAllTodo } from "../../store/todos";
import { deleteFilter } from "../../store/filters";

import styles from "./ProjectItem.module.scss";

const ProjectItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm(`Do you really want to delete project ${item.title}?`)) {
      dispatch(deleteProject(item.id));
      dispatch(deleteProjectAllTodo(item.id));
      dispatch(deleteFilter(item.id));
    }
  };

  return (
    <Paper className={styles.project_item}>
      {item.title}

      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default ProjectItem;
