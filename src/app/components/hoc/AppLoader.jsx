import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProjectsList, loadProjects } from "../../store/projects";
import { getTodosList, loadTodoList } from "../../store/todos";
import { getFilter, loadFilters } from "../../store/filters";

import Loader from "../Loader";

const AppLoader = ({ children }) => {
  const projectsList = useSelector(getProjectsList());
  const todosList = useSelector(getTodosList());
  const todosFilter = useSelector(getFilter());

  const dispatch = useDispatch();

  useEffect(() => {
    const projects = localStorage.getItem("projects");
    const todos = localStorage.getItem("todos");
    const filter = localStorage.getItem("todoFilter");

    if (projects) {
      dispatch(loadProjects(projects));
    } else {
      dispatch(loadProjects("[]"));
    }

    if (todos) {
      dispatch(loadTodoList(todos));
    } else {
      dispatch(loadTodoList("[]"));
    }

    if (filter) {
      dispatch(loadFilters(filter));
    } else {
      dispatch(loadFilters("[]"));
    }
  }, [dispatch]);

  if (!projectsList || !todosList || !todosFilter) {
    return <Loader />;
  }

  return children;
};

export default AppLoader;
