import React, { useState } from "react";
import { useDispatch } from "react-redux";

import InputForm from "../InputForm";
import ProjectsList from "../ProjectsList";
import { addProject } from "../../store/projects";

import styles from "./ProjectsPage.module.scss";

const ProjectsPage = () => {
  const [newProject, setNewProject] = useState({ title: "" });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addProject(newProject));

    setNewProject({ title: "" });
  };

  return (
    <div className={styles.projects_container}>
      <header>
        <h1>Projects List</h1>
      </header>

      <InputForm
        inputValue={newProject.title}
        onChange={setNewProject}
        onSubmit={handleSubmit}
        placeholder="New project name..."
        label="Project"
        name="title"
      />

      <ProjectsList />
    </div>
  );
};

export default ProjectsPage;
