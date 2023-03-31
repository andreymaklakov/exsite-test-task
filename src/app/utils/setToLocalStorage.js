export function setProjectsToLS(data) {
  localStorage.setItem("projects", JSON.stringify(data));
}

export function setTodosToLS(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

export function setTodosFilterToLS(data) {
  localStorage.setItem("todoFilter", JSON.stringify(data));
}
