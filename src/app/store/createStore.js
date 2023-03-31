import { combineReducers, configureStore } from "@reduxjs/toolkit";

import projectsReducer from "./projects";
import todosReducer from "./todos";
import filtersReducer from "./filters";

const rootReducer = combineReducers({
  projects: projectsReducer,
  todos: todosReducer,
  filters: filtersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
