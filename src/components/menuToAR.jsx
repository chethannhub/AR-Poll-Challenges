import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronRight, FaCube } from "react-icons/fa";



const MenuToAR = ({ modelUrl: propModelUrl,modelARUrl: propModelARUrl, categoryId: propCategoryId, currentQuestion: propCurrentQuestion, totalQuestions: propTotalQuestions }) => {
  const [isAdvancedARSupported, setIsAdvancedARSupported] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const queryModelUrl = getQueryParam("model");
  const queryModelARUrl = getQueryParam("modelAR");
  const queryCategoryId = getQueryParam("categoryId");
  const queryCurrentQuestion = parseInt(getQueryParam("currentQuestion"), 10) || 0;
  const queryTotalQuestions = parseInt(getQueryParam("totalQuestions"), 10) || 0;

  const modelUrl = propModelUrl || queryModelUrl;
  const modelARUrl = propModelARUrl || queryModelARUrl;
  const categoryId = propCategoryId || queryCategoryId;
  const currentQuestion = propCurrentQuestion || queryCurrentQuestion;
  const totalQuestions = propTotalQuestions || queryTotalQuestions;

  useEffect(() => {
    console.log("Data recived in menu-to-ar page: ", modelUrl, categoryId, currentQuestion, totalQuestions)
    console.log("current questions in menu-to-ar: ", currentQuestion)
    if (!modelUrl || !categoryId || isNaN(currentQuestion) || !totalQuestions) {
      if (categoryId) {
        alert("Required information is missing. Returning to poll.");
        console.log("Required information is missing. Returning to poll.");
        navigate(`/poll/${categoryId}`);
      } else {
        alert("category Id is missing. Returning to home.");
        console.log("category Id is missing. Returning to home.");
        navigate(`/`);
      }
    }
  }, [modelUrl, categoryId, currentQuestion, totalQuestions, navigate]);

  useEffect(() => {
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setIsAdvancedARSupported(supported);
        console.log("Is Advanced AR Supported in this device: " + isAdvancedARSupported)
      });
    }
  }, []);

  const handleNextPoll = () => {

    localStorage.setItem("showSelectedModel", false);

    const pointsForThisGame = 5;
    const nextQuestion = currentQuestion + 1;
  
    if (nextQuestion < totalQuestions) {
      navigate(`/poll/${categoryId}?currentQuestion=${nextQuestion}`);

      console.log("currentQuestion when navigating to poll from menu :", currentQuestion)
    } else {
      const savedPoints = localStorage.getItem("points") || 0;
      const totalPoints = parseInt(savedPoints, 10) + pointsForThisGame;

      localStorage.setItem('selectedModel', null);
      localStorage.setItem('selectedModelAR', null);
      localStorage.setItem('categoryId', categoryId);
      localStorage.setItem('currentQuestion', 0);
      localStorage.setItem('showSelectedModel', false);
  
      localStorage.setItem('points', totalPoints);
      navigate('/results', {
        state: { thisGamePoints: pointsForThisGame }
      });
    }

  };
  

  const handleViewAR = () => {
    console.log("Data passing to view AR: ", modelUrl, categoryId, currentQuestion, totalQuestions)
    window.location.href = `/AR.html?model=${encodeURIComponent(modelUrl)}&modelAR=${encodeURIComponent(modelARUrl)}&categoryId=${categoryId}&currentQuestion=${currentQuestion}&totalQuestions=${totalQuestions}`;
  };

  return (
    <motion.div
      className="flex flex-col justify-center gap-4 text-center items-center mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-center"
      >
        <button
          onClick={handleViewAR}
          className="bg-blue-600  flex flex-row items-center gap-2 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700"
        >
          View in AR
          {/* <FaCube/> */}
        </button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-center"
      >
        <button
          onClick={handleNextPoll}
          className="bg-gray-400 flex flex-row items-center gap-2 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-500"
        >
          Next
          <FaChevronRight />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MenuToAR;
