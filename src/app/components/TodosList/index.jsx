import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTodosList, sortTodos } from "../../store/todos";
import { changeFilter, getFilter } from "../../store/filters";

import SearchInput from "../SearchInput";
import TodoItem from "../TodoItem";

import styles from "./TodosList.module.scss";
import DraggableItemsWrapper from "../DraggableItemsWrapper";

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

  const handleDrop = (item, draggedItem) => {
    dispatch(sortTodos(item, draggedItem));
  };
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  return (
    <>
      <SearchInput value={searchValue} onChange={handleChange} />
      {filteredList.map((item) => (
        <DraggableItemsWrapper
          key={item.id}
          item={item}
          styles={styles.dragContainer}
          onDrop={handleDrop}
          draggedItem={draggedItem}
          onDragStart={handleDragStart}
        >
          <TodoItem item={item} />
        </DraggableItemsWrapper>
      ))}
    </>
  );
};

export default TodosList;
