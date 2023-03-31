import { Route, Routes } from "react-router-dom";
import FullProject from "./components/FullProject";

import AppLoader from "./components/hoc/AppLoader";
import ProjectsPage from "./components/ProjectsPage";

function App() {
  return (
    <AppLoader>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path=":id" element={<FullProject />} />
      </Routes>
    </AppLoader>
  );
}

export default App;
