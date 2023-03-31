import { createSlice } from "@reduxjs/toolkit";

import { setTodosFilterToLS } from "../utils/setToLocalStorage";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    currentFilter: null,
  },
  reducers: {
    filterLoaded(state, action) {
      const filter = JSON.parse(action.payload);
      state.currentFilter = filter;
    },
    filterChanged(state, action) {
      const filterExists = state.currentFilter.find(
        (item) => item.projectId === action.payload.projectId
      );

      if (!filterExists) {
        state.currentFilter = [...state.currentFilter, action.payload];
      } else {
        filterExists.value = action.payload.value;
      }

      setTodosFilterToLS(state.currentFilter);
    },
    filterDeleted(state, action) {
      state.currentFilter = state.currentFilter.filter(
        (item) => item.projectId !== action.payload
      );

      setTodosFilterToLS(state.currentFilter);
    },
  },
});

const { reducer: filtersReducer, actions } = filtersSlice;
const { filterChanged, filterDeleted, filterLoaded } = actions;

export const loadFilters = (filters) => (dispatch) => {
  dispatch(filterLoaded(filters));
};

export const changeFilter = (data) => (dispatch) => {
  dispatch(filterChanged(data));
};

export const deleteFilter = (projId) => (dispatch) => {
  dispatch(filterDeleted(projId));
};

export const getFilter = () => (state) => state.filters.currentFilter;

export default filtersReducer;
