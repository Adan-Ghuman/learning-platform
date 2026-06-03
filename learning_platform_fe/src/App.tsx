import { Routes, Route } from "react-router-dom";

import CourseList from "./pages/course-list";
import CourseDetail from "./pages/course-detail";
import LearnerResponses from "./pages/learner-responses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/responses" element={<LearnerResponses />} />
    </Routes>
  );
}

export default App;