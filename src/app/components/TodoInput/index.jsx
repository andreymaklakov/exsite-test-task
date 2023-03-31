import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addTodo } from "../../store/todos";
import InputForm from "../InputForm";

const TodoInput = ({ project, parent }) => {
  const [newTodo, setNewTodo] = useState({
    text: "",
    done: false,
    projectId: project,
    parent: parent || null,
    hasKids: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo(newTodo));

    setNewTodo((prevState) => ({ ...prevState, text: "" }));
  };

  return (
    <InputForm
      inputValue={newTodo.text}
      onChange={setNewTodo}
      onSubmit={handleSubmit}
      placeholder="New todo..."
      label="Todo"
      name="text"
    />
  );
};

export default TodoInput;
