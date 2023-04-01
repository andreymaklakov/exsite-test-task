import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { savePDF } from "@progress/kendo-react-pdf";

import { getProjectsList } from "../../store/projects";
import FullProjectTitle from "../FullProjectTitle";
import TodoInput from "../TodoInput";
import TodosList from "../TodosList";

import styles from "./FullProject.module.scss";

const FullProject = () => {
  const list = useSelector(getProjectsList());

  const pageRef = useRef();

  const { id } = useParams();

  const currentProject = list.find((project) => project.id === Number(id));

  if (!currentProject) {
    return <Navigate to="/" replace />;
  }

  const handleSavePage = () => {
    pageRef.current.style.fontFamily = "DejaVu Sans";

    savePDF(pageRef.current, {
      fileName: currentProject.title,
      paperSize: "A4",
    });
  };

  return (
    <div ref={pageRef} className={styles.fullProject_container}>
      <FullProjectTitle project={currentProject} onSave={handleSavePage} />

      <TodoInput project={currentProject.id} />

      <TodosList project={currentProject} />
    </div>
  );
};

export default FullProject;
