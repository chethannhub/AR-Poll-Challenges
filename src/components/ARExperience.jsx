import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ARjsMarker from "./ARjsMarker";

const ARExperience = () => {
  const [isAdvancedARSupported, setIsAdvancedARSupported] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const modelUrl = location.state?.modelUrl || getQueryParam("model");
  const categoryId = location.state?.categoryId || getQueryParam("categoryId");
  const currentQuestion = parseInt(location.state?.currentQuestion || getQueryParam("currentQuestion") || 0, 10);
  const totalQuestions = parseInt(location.state?.totalQuestions || getQueryParam("totalQuestions"), 10);


  
  useEffect(() => {
    console.log("Data recived in AR Experience page: ", modelUrl, categoryId, currentQuestion, totalQuestions)
    console.log("current questions in ARExperience: ", currentQuestion)
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
    const pointsForThisGame = 5;
    console.log("current questions in ARExperience when clicking next button: ", currentQuestion)

    if (currentQuestion + 1 < totalQuestions) {
      navigate(`/poll/${categoryId}`, {
        state: { currentQuestion: currentQuestion + 1 },
      });
    } else {
      const savedPoints = localStorage.getItem("points") || 0;
      const totalPoints = parseInt(savedPoints, 10) + pointsForThisGame;

      localStorage.setItem("points", totalPoints);
      navigate("/results", { state: { thisGamePoints: pointsForThisGame } });
    }
  };

  const handleViewAR = () => {
    window.location.href = `src/pages/AR.html?model=${encodeURIComponent(modelUrl)}&categoryId=${categoryId}&currentQuestion=${currentQuestion}&totalQuestions=${totalQuestions}`;
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-800 text-center font-bold mt-10">Enjoy AR Experience</h1>

      <div className="text-center">

        <button
          onClick={handleNextPoll}
          className="bg-gray-400  text-white px-4 py-2 rounded-md mt-4"
        >
          Next
        </button>
      </div>

      <div className="flex justify-around text-center items-center mt-6">
        <button
          onClick={handleViewAR}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          View in AR
        </button>
      </div>
    </div>
  );
};

export default ARExperience;
