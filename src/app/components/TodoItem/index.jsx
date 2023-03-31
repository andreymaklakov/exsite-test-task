import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Paper, TextField } from "@mui/material";
import {
  CheckCircleOutlineOutlined as DoneIcon,
  DeleteOutlined as DeleteIcon,
  CreateOutlined as PenIcon,
  ArrowDropDown as ArrowDownIcon,
  ArrowDropUp as ArrowUpIcon,
} from "@mui/icons-material";

import cn from "classnames";

import {
  deleteTodo,
  toggleTodoDone,
  changeTodo,
  getTodosList,
  sortTodos,
} from "../../store/todos";
import TodoInput from "../TodoInput";

import styles from "./TodoItem.module.scss";

const TodoItem = ({ item }) => {
  const [changeActive, setChangeActive] = useState(false);
  const [kidsOpen, setKidsOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const [text, setText] = useState("");

  const list = useSelector(getTodosList());
  const currentProjTodos = list.filter(
    (todo) => todo.projectId === item.projectId
  );
  const currentTodoKids = currentProjTodos.filter(
    (todo) => todo.parent === item.id
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      setText(item.text);
    }
  }, []);

  const textStyles = cn({
    [styles.text_hide]: changeActive,
    [styles.text]: true,
  });
  const inputStyles = cn({
    [styles.input_hide]: !changeActive,
    [styles.input]: true,
  });

  const handleChangeClick = (e) => {
    e.preventDefault();

    if (changeActive) {
      dispatch(changeTodo({ text, id: item.id }));
    }
    setChangeActive((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const iconStyles = cn({
    [styles.todo_item_done_icon]: true,
    [styles.todo_item_done_icon_hide]: !item.done,
  });

  const handleClickDone = () => {
    dispatch(toggleTodoDone(item.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
  };

  const treeBorderStyle = () => {
    if (item.hasKids && kidsOpen) {
      return `2px solid red`;
    } else {
      return "none";
    }
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
    <Paper
      className={styles.todosTree_container}
      style={{ border: treeBorderStyle() }}
    >
      <Paper className={styles.todo_item}>
        <div className={styles.todo_item_content}>
          <div onClick={handleClickDone} className={textStyles}>
            {item.text}
          </div>

          <form className={styles.todo_item_form} onSubmit={handleChangeClick}>
            <TextField
              className={inputStyles}
              value={text}
              onChange={handleChange}
              multiline
            />

            <div className={styles.todo_item_icons_container}>
              <DoneIcon className={iconStyles} />

              <IconButton
                disabled={!text}
                type="submit"
                onClick={handleChangeClick}
              >
                <PenIcon />
              </IconButton>

              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
          </form>
        </div>

        <TodoInput project={item.projectId} parent={item.id} />

        {item.hasKids && (
          <IconButton onClick={() => setKidsOpen((prevState) => !prevState)}>
            {!kidsOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </IconButton>
        )}
      </Paper>

      {kidsOpen &&
        currentTodoKids.map((todo) => (
          <div
            draggable={true}
            onDragStart={(e) => handleDragStart(e, todo)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, todo)}
            className={styles.todoKids_container}
            key={todo.id}
          >
            <TodoItem item={todo} />
          </div>
        ))}
    </Paper>
  );
};

export default TodoItem;
