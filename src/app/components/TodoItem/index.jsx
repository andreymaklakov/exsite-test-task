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
import DraggableItemsWrapper from "../DraggableItemsWrapper";

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
  }, [item]);

  const textStyles = cn({
    [styles.text_hide]: changeActive,
    [styles.text]: true,
  });
  const inputStyles = cn({
    [styles.input_hide]: !changeActive,
    [styles.input]: true,
  });
  const iconStyles = cn({
    [styles.todo_item_done_icon]: true,
    [styles.todo_item_done_icon_hide]: !item.done,
  });
  const formStyles = cn({
    [styles.todo_item_form]: true,
    [styles.todo_item_form_inputHidden]: !changeActive,
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

  const handleClickDone = () => {
    dispatch(toggleTodoDone(item.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
  };

  const handleDrop = (item, draggedItem) => {
    dispatch(sortTodos(item, draggedItem));
  };
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  return (
    <Paper className={styles.todosTree_container}>
      <Paper className={styles.todo_item}>
        <div className={styles.todo_item_content}>
          <div onClick={handleClickDone} className={textStyles}>
            {item.text}
          </div>

          <form className={formStyles} onSubmit={handleChangeClick}>
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
        currentTodoKids.map((item) => (
          <DraggableItemsWrapper
            key={item.id}
            item={item}
            styles={styles.todoKids_container}
            onDrop={handleDrop}
            draggedItem={draggedItem}
            onDragStart={handleDragStart}
          >
            <TodoItem item={item} />
          </DraggableItemsWrapper>
        ))}
    </Paper>
  );
};

export default TodoItem;
