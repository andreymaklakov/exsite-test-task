import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getProjectsList } from "../../store/projects";
import ProjectItem from "../ProjectItem";

import styles from "./ProjectsList.module.scss";

const ProjectsList = () => {
  const list = useSelector(getProjectsList());

  return list.map((item) => (
    <Link
      className={styles.list}
      target={"_blank"}
      key={item.id}
      to={`/${item.id}`}
    >
      <ProjectItem item={item} />
    </Link>
  ));
};

export default ProjectsList;
