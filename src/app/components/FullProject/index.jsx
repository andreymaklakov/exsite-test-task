import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import html2pdf from "html2pdf.js";

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
    const opt = {
      margin: 1,
      filename: currentProject.title,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(pageRef.current).set(opt).toPdf().save();
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
