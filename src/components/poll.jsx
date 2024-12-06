import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "@google/model-viewer";
import { categories } from "./data";

const Poll = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  

  const category = categories[categoryId];
  const initialQuestion = parseInt(location.state?.currentQuestion || 0, 10); 
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);

  console.log("current questions in poll: ", currentQuestion)
  
  const handleOption = (model) => {
    console.log("current categoryId passed to ARExperience from poll: ", categoryId)
    console.log("current questions passed to ARExperience from poll: ", currentQuestion)
    navigate("/ar-experience", {
      state: {
        modelUrl: model,
        categoryId,
        currentQuestion: currentQuestion,
        totalQuestions: category.questions.length,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">{category.name}</h1>

      <div className="text-base text-gray-600 font-semibold mt-2">{currentQuestion + 1} out of {category.questions.length}</div>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6 mt-6">

        <div className="text-center">
          <h2 className="text-xl font-semibold">
            {category.questions[currentQuestion].question}
          </h2>
          <h3 className="text-sm font-semibold text-gray-700">
            {category.questions[currentQuestion].subquestion}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center mt-4">

          <div className="text-center">
            <model-viewer
              key={category.questions[currentQuestion].model1}
              src={category.questions[currentQuestion].model1}
              camera-controls
              auto-rotate
              rotation-per-second="45deg"
              className="w-40 h-40 md:w-48 md:h-48"
              loading="lazy"
              
            ></model-viewer>
            <button
              onClick={() => handleOption(category.questions[currentQuestion].model1AR)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 "
            >
              Option 1
            </button>
          </div>

          <div className="text-center">
            <model-viewer
              key={category.questions[currentQuestion].model2}
              src={category.questions[currentQuestion].model2}
              camera-controls
              auto-rotate
              rotation-per-second="45deg"
              className="w-40 h-40 md:w-48 md:h-48"
              
            >
            </model-viewer>
            <button
              onClick={() => handleOption(category.questions[currentQuestion].model2AR)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 "
            >
              Option 2
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Poll;
