import { createSlice } from "@reduxjs/toolkit";

import { setTodosToLS } from "../utils/setToLocalStorage";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todosList: null,
  },
  reducers: {
    todosLoaded(state, action) {
      const todos = JSON.parse(action.payload);
      state.todosList = todos;
    },
    todoAdded(state, action) {
      const todosCopy = [...state.todosList];
      const sortedById = todosCopy.sort((a, b) => a.id - b.id);
      const lastId = sortedById[sortedById.length - 1]?.id || 0;
      state.todosList = [
        ...state.todosList,
        { ...action.payload, id: lastId + 1 },
      ];

      if (action.payload.parent) {
        const parent = state.todosList.find(
          (item) => item.id === action.payload.parent
        );

        if (parent) {
          parent.hasKids = true;
        }
      }

      setTodosToLS(state.todosList);
    },
    todoDone(state, action) {
      const todo = state.todosList.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.done = !todo.done;

        setTodosToLS(state.todosList);
      }
    },
    todoDeleted(state, action) {
      const deletedTodo = state.todosList.find(
        (item) => item.id === action.payload
      );

      state.todosList = state.todosList.filter(
        (item) => item.id !== action.payload
      );
      state.todosList = state.todosList.filter(
        (item) => item.parent !== action.payload
      );

      if (deletedTodo.parent) {
        const parent = state.todosList.find(
          (item) => item.id === deletedTodo.parent
        );

        const hasMoreKids = state.todosList.filter(
          (item) => item.parent === deletedTodo.parent
        ).length;

        if (!hasMoreKids) {
          parent.hasKids = false;
        }
      }

      setTodosToLS(state.todosList);
    },
    projectAllTodoDeleted(state, action) {
      state.todosList = state.todosList.filter(
        (item) => item.projectId !== action.payload
      );

      setTodosToLS(state.todosList);
    },
    todoChanged(state, action) {
      const todo = state.todosList.find(
        (item) => item.id === action.payload.id
      );

      if (todo) {
        todo.text = action.payload.text;
      }

      setTodosToLS(state.todosList);
    },
    todosSorted(state, action) {
      const draggedItem = state.todosList.find(
        (item) => item.id === action.payload.draggedItem.id
      );
      const draggedItemIndex = state.todosList.indexOf(draggedItem);

      const overItem = state.todosList.find(
        (item) => item.id === action.payload.item.id
      );
      const overItemIndex = state.todosList.indexOf(overItem);

      state.todosList.splice(draggedItemIndex, 1);
      state.todosList.splice(overItemIndex, 0, draggedItem);

      setTodosToLS(state.todosList);
    },
  },
});

const { reducer: todosReducer, actions } = todosSlice;
const {
  todoAdded,
  todoDone,
  todoDeleted,
  todosLoaded,
  projectAllTodoDeleted,
  todoChanged,
  todosSorted,
} = actions;

export const loadTodoList = (todos) => (dispatch) => {
  dispatch(todosLoaded(todos));
};

export const addTodo = (todo) => (dispatch) => {
  dispatch(todoAdded(todo));
};

export const toggleTodoDone = (todoId) => (dispatch) => {
  dispatch(todoDone(todoId));
};

export const deleteTodo = (todoId) => (dispatch) => {
  dispatch(todoDeleted(todoId));
};

export const deleteProjectAllTodo = (projId) => (dispatch) => {
  dispatch(projectAllTodoDeleted(projId));
};

export const changeTodo = (item) => (dispatch) => {
  dispatch(todoChanged(item));
};

export const sortTodos = (item, draggedItem) => (dispatch) => {
  dispatch(todosSorted({ item, draggedItem }));
};

export const getTodosList = () => (state) => state.todos.todosList;

export default todosReducer;
