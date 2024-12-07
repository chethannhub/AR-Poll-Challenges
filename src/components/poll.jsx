import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "@google/model-viewer";
import { categories } from "./data";
import MenuToAR from "./menuToAR";

const Poll = () => {
  const { categoryId } = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const category = categories[categoryId];
  const totalQuestions = category.questions.length;
  const initialCurrentQuestion = parseInt(queryParams.get("currentQuestion"), 10) || 0;

  const [currentQuestion, setCurrentQuestion] = useState(initialCurrentQuestion);
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem("selectedModel") || null);
  const [selectedModelAR, setSelectedModelAR] = useState(localStorage.getItem("sselectedModelAR") || null);
  const [showSelectedModel, setShowShowSelectedModel] = useState(localStorage.getItem("showSelectedModel") === "true" ||  false);

  useEffect(() => {
    const updatedCurrentQuestion = parseInt(queryParams.get("currentQuestion"), 10);
    if (!isNaN(updatedCurrentQuestion)) {
      setCurrentQuestion(updatedCurrentQuestion);

      const storedShowSelectedModel = localStorage.getItem("showSelectedModel") === "true";
      if (!storedShowSelectedModel) {
        setShowShowSelectedModel(false);
      }
    }
  }, [location.search]);

  const handleOption = (model, modelAR) => {
    setSelectedModel(model);
    setSelectedModelAR(modelAR);

    localStorage.setItem("selectedModel", model);
    localStorage.setItem("selectedModelAR", modelAR);
    setShowShowSelectedModel(true);
  };

  console.log("In Poll: ", selectedModel, selectedModelAR, "[showSelectedModel:", showSelectedModel, "]", categoryId, currentQuestion);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">{category.name}</h1>

      <div className="text-base text-gray-600 font-semibold mt-2">
        {currentQuestion + 1} out of {totalQuestions}
      </div>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6 mt-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{category.questions[currentQuestion].question}</h2>
          <h3 className="text-sm font-semibold text-gray-700">
            {category.questions[currentQuestion].subquestion}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center mt-4">
          {!showSelectedModel ? (
            <>
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
                  onClick={() =>
                    handleOption(
                      category.questions[currentQuestion].model1,
                      category.questions[currentQuestion].model1AR
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                >
                  {category.questions[currentQuestion].option1Name}
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
                ></model-viewer>
                <button
                  onClick={() =>
                    handleOption(
                      category.questions[currentQuestion].model2,
                      category.questions[currentQuestion].model2AR
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                >
                  {category.questions[currentQuestion].option2Name}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <model-viewer
                src={selectedModel}
                camera-controls
                auto-rotate
                rotation-per-second="45deg"
                className="w-40 h-40 md:w-48 md:h-48"
              ></model-viewer>
            </div>
          )}
        </div>

        {showSelectedModel && (
          <MenuToAR
            modelUrl={selectedModel}
            modelARUrl={selectedModelAR}
            categoryId={categoryId}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />
        )}
      </div>
    </div>
  );
};

export default Poll;
