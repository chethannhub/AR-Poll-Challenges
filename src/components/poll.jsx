import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "@google/model-viewer";
import { categories } from "./data";
import MenuToAR from "./menuToAR";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const [showSelectedModel, setShowShowSelectedModel] = useState(localStorage.getItem("showSelectedModel") === "true" || false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold mt-10 text-blue-600 flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaQuestionCircle className="mr-2" /> {category.name}
      </motion.h1>

      <motion.div
        className="text-base text-gray-600 font-semibold mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {currentQuestion + 1} out of {totalQuestions}
      </motion.div>

      <motion.div
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mt-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">{category.questions[currentQuestion].question}</h2>
          <h3 className="text-sm font-semibold text-gray-500">
            {category.questions[currentQuestion].subquestion}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row text-center justify-around items-center mt-4">
          {!showSelectedModel ? (
            <>
              {["model1", "model2"].map((modelKey, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col justify-around items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >

                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 , scale: 0.8, y:-20}}
                    animate={{ opacity: 1 ,  scale: 1, y: 0}}
                    transition={{ duration: 1 }}
                  >
                    <model-viewer
                      key={category.questions[currentQuestion][modelKey]}
                      src={category.questions[currentQuestion][modelKey]}
                      camera-controls
                      auto-rotate
                      rotation-per-second="45deg"
                      className="w-40 h-40 md:w-48 md:h-48"
                      loading="lazy"
                    ></model-viewer>
                  </motion.div>  

                  <button
                    onClick={() =>
                      handleOption(
                        category.questions[currentQuestion][modelKey],
                        category.questions[currentQuestion][`${modelKey}AR`]
                      )
                    }
                    className="bg-blue-600 text-center text-white px-4 py-2 rounded-md mt-4 flex items-center justify-center space-x-2"
                  >
                    <FaCheckCircle />
                    <span>{category.questions[currentQuestion][`${modelKey}Name`]}</span>
                  </button>
                  </motion.div>
                ))}
              </>
            ) : (
              <motion.div
                className="text-center relative"
                initial={{ opacity: 0, scale: 0.8, y: -50 }}
                animate={{ opacity: 1, scale: 1.1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, 5, -5, 0],
                }}
              >
                {/*Confetti Effect*/}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, index) => (
                    <motion.div
                      key={`circle-${index}`}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: `radial-gradient(circle, #FFD700, #FFA500)`,
                        top: "0%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      initial={{ opacity: 0, x: 0, y: -10 }}
                      animate={{
                        opacity: [1, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, -80, 150],
                        rotate: [0, 180, 260],
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        repeat: Infinity,
                      }}
                    ></motion.div>
                  ))}

                  {[...Array(5)].map((_, index) => (
                    <motion.div
                      key={`star-${index}`}
                      className="absolute w-3 h-3"
                      style={{
                        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                        background: `linear-gradient(45deg, #FF69B4, #FF1493)`,
                        top: "0%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      initial={{ opacity: 0, x: 0, y: -10 }}
                      animate={{
                        opacity: [1, 0],
                        x: [0, (Math.random() - 0.5) * 250],
                        y: [0,-80, 150],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: Math.random() * 0.7,
                        repeat: Infinity,
                      }}
                    ></motion.div>
                  ))}

                  {[...Array(6)].map((_, index) => (
                    <motion.div
                      key={`square-${index}`}
                      className="absolute w-2 h-2"
                      style={{
                        background: `linear-gradient(45deg, #00BFFF, #1E90FF)`,
                        top: "0%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      initial={{ opacity: 0, x: 0, y: -10 }}
                      animate={{
                        opacity: [1, 0],
                        x: [0, (Math.random() - 0.5) * 180],
                        y: [0,-80, 150],
                        rotate: [0, 45, 90],
                      }}
                      transition={{
                        duration: 2.3,
                        delay: Math.random() * 0.6,
                        repeat: Infinity,
                      }}
                    ></motion.div>
                ))}
              </div>

              <model-viewer
                src={selectedModel}
                camera-controls
                auto-rotate
                rotation-per-second="45deg"
                className="w-40 h-40 md:w-48 md:h-48 z-10 relative"
              ></model-viewer>
            </motion.div>


          )}
        </div>

        {showSelectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MenuToAR
              modelUrl={selectedModel}
              modelARUrl={selectedModelAR}
              categoryId={categoryId}
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Poll;
