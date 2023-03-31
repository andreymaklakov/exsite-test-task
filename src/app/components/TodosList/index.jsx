import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTodosList, sortTodos } from "../../store/todos";
import { changeFilter, getFilter } from "../../store/filters";

import SearchInput from "../SearchInput";
import TodoItem from "../TodoItem";

import styles from "./TodosList.module.scss";

const TodosList = ({ project }) => {
  const list = useSelector(getTodosList());
  const filter = useSelector(getFilter());

  const [draggedItem, setDraggedItem] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const filteredListByProject = list.filter(
    (item) => item.projectId === project.id
  );

  const notAKid = filteredListByProject.filter((item) => item.parent === null);

  const filteredList = searchValue
    ? filteredListByProject.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : notAKid;

  useEffect(() => {
    const currentProjectFilter = filter.find(
      (item) => item.projectId === project.id
    );

    if (currentProjectFilter) {
      setSearchValue(currentProjectFilter.value);
    }
  }, [filter, project.id]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(changeFilter({ projectId: project.id, value: e.target.value }));
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, item) => {
    e.preventDefault();

    dispatch(sortTodos(item, draggedItem));
  };

  return (
    <>
      <SearchInput value={searchValue} onChange={handleChange} />
      {filteredList.map((item) => {
        return (
          <div
            draggable={true}
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, item)}
            className={styles.dragContainer}
            key={item.id}
          >
            <TodoItem item={item} />
          </div>
        );
      })}
    </>
  );
};

export default TodosList;
