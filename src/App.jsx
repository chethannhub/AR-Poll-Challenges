import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Poll from "./components/poll.jsx";
import Results from "./components/results.jsx";
import ARExperience from "./components/ARExperience.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:categoryId" element={<Poll />} />
        <Route path="/ar-experience" element={<ARExperience/>} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
