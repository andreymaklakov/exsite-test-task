import { createSlice } from "@reduxjs/toolkit";

import { setProjectsToLS } from "../utils/setToLocalStorage";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: null,
  },
  reducers: {
    projectsLoaded(state, action) {
      const projects = JSON.parse(action.payload);
      state.projectsList = projects;
    },
    projectAdded(state, action) {
      const lastId = state.projectsList[state.projectsList.length - 1]?.id || 0;

      state.projectsList = [
        ...state.projectsList,
        { ...action.payload, id: lastId + 1 },
      ];

      setProjectsToLS(state.projectsList);
    },
    projectDeleted(state, action) {
      state.projectsList = state.projectsList.filter(
        (item) => item.id !== action.payload
      );

      setProjectsToLS(state.projectsList);
    },
    projectTitleChanged(state, action) {
      const project = state.projectsList.find(
        (item) => item.id === action.payload.id
      );

      if (project) {
        project.title = action.payload.title;
      }

      setProjectsToLS(state.projectsList);
    },
  },
});

const { reducer: projectsReducer, actions } = projectsSlice;
const { projectsLoaded, projectAdded, projectDeleted, projectTitleChanged } =
  actions;

export const loadProjects = (list) => (dispatch) => {
  dispatch(projectsLoaded(list));
};

export const addProject = (item) => (dispatch) => {
  dispatch(projectAdded(item));
};

export const deleteProject = (projId) => (dispatch) => {
  dispatch(projectDeleted(projId));
};

export const changeProjectTitle = (item) => (dispatch) => {
  dispatch(projectTitleChanged(item));
};

export const getProjectsList = () => (state) => state.projects.projectsList;

export default projectsReducer;
