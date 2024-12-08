import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useEffect} from "react";
import Home from "./pages/home";
import Categories from "./pages/catgories.jsx";
import Poll from "./components/poll.jsx";
import Results from "./components/results.jsx";
import MenuToAR from "./components/menuToAR.jsx";

const App = () => {
  const preservePoints = () => {
    try {
      const points = localStorage.getItem('points');
      localStorage.clear();

      if (points !== null) {
        localStorage.setItem('points', points);
      }
    } catch (error) {
      console.error("Failed to preserve points:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      try {
        preservePoints();
      } catch (error) {
        console.error("Navigation Error:", error);
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/theme/:themeIndex" element={<Categories />} />
        <Route path="/poll/:themeIndex/:categoryId" element={<Poll />} />
        <Route path="/menu_to_ar" element={<MenuToAR/>} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
