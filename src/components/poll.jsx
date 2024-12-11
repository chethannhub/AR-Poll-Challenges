import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "@google/model-viewer";
import MenuToAR from "./menuToAR";
import { FaCheckCircle, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Poll = () => {
  const { categoryId, themeIndex } = useParams();
  const [feedback, setFeedback] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(true);

  const location = useLocation();

  const categoryState = location.state ? location.state.category : null;
  const category = categoryState || JSON.parse(localStorage.getItem("category"));
  
  if (category) {
      localStorage.setItem("category", JSON.stringify(category));
  }
  
  const queryParams = new URLSearchParams(location.search);

  const totalQuestions = category.questions.length;
  const initialCurrentQuestion = parseInt(queryParams.get("currentQuestion"), 10) || 0;

  const [currentQuestion, setCurrentQuestion] = useState(initialCurrentQuestion);
  const [selectedModel, setSelectedModel] = useState(localStorage.getItem("selectedModel") || null);
  const [selectedModelAR, setSelectedModelAR] = useState(localStorage.getItem("selectedModelAR") || null);
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

  const themeName = localStorage.getItem("ThemeName")
  let savedPoints = localStorage.getItem("current_quiz_points") || 0;

  const handleOption = (model, modelAR, modelName) => {

    if(themeName == "Quiz") {
      const currentQuestionData = category.questions[currentQuestion];
      const isCorrect = modelName === currentQuestionData.answer;
    
      setFeedback(isCorrect ? 'correct' : 'incorrect');
    
      if (isCorrect) {
        const totalPoints = parseInt(savedPoints, 10) + 1;
        localStorage.setItem('current_quiz_points', totalPoints);
      }
    }
    
    localStorage.setItem("selectedModel", model);
    localStorage.setItem("selectedModelAR", modelAR);
  
    setSelectedModel(model);
    setSelectedModelAR(modelAR);
  
    setShowShowSelectedModel(true);
  
    // setTimeout(() => setFeedback(null), 2000); 
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isSmallScreen = window.innerWidth < 990;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center">
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-4/5 max-w-md text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">How to Use AR</h2>
            <p className="text-gray-600 mb-4">
              1. Place the marker in front of your camera.<br />
              2. Use your device camera to scan the marker.<br />
              3. View the AR content.
            </p>
            <div className="mb-4">
              <img
                src="/images/GO_marker.png"
                alt="Marker"
                className="w-32 h-32 mx-auto"
              />
            </div>
            <p className="mb-4 text-gray-600">Download this marker to view AR content</p>
            <a
              href="/images/GO_marker.png" // Replace with your marker image path
              download="marker.jpg"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Download Marker
            </a>
          </div>
        </div>
      )}

      <motion.h1
        className="text-2xl sm:text-4xl lg:text-3xl font-bold mt-10 text-blue-600 flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FaQuestionCircle className="mr-2" /> {category.categoryName}
      </motion.h1>

      <motion.div
        className="text-base sm:text-xl lg:text-lg text-gray-600 font-semibold mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {currentQuestion + 1} out of {totalQuestions}
      </motion.div>

      {themeName == "Quiz" ? (
      <h3 className="text-lg sm:text-2xl lg:text-lg font-semibold text-gray-500">
          savedPoints: {savedPoints}
      </h3>
      ) : (
        ""
      )}

      <motion.div
        className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mt-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-gray-700">
            {category.questions[currentQuestion].question}
          </h2>
          <h3 className="text-lg sm:text-2xl lg:text-lg font-semibold text-gray-500">
            {category.questions[currentQuestion].subquestion}
          </h3>

        </div>

        <div className="flex flex-col lg:flex-row text-center gap-2 justify-around items-center mt-2">
          {!showSelectedModel ? (
            <>
              {["model1", "model2"].map((modelKey, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col justify-around items-center"
               
                >
                  <motion.div
                    className="text-center "
                    initial={{ opacity: 0 , scale: 0.8, y:-20}}
                    animate={{ opacity: 1 ,  scale: 1, y: 0}}
                    transition={{ duration: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <model-viewer
                      key={category.questions[currentQuestion][modelKey]}
                      src={category.questions[currentQuestion][modelKey]}
                      camera-controls
                      auto-rotate
                      rotation-per-second="45deg"
                      style={{
                        width: isSmallScreen ? "40vw" : "40vh",
                        height: isSmallScreen ? "30vh" : "50vh",
                      }}                      
                      loading="lazy"
                    ></model-viewer>
                  </motion.div>  

                  <motion.div
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    className="text-center"
      >
                      <button
                        onClick={() =>
                          handleOption(
                            category.questions[currentQuestion][modelKey],
                            category.questions[currentQuestion][`${modelKey}AR`],
                            category.questions[currentQuestion][`${modelKey}Name`]
                          )
                        }
                        className="bg-blue-600 sm:text-2xl lg:text-lg text-center text-white px-4 py-2 rounded-md mt-4 flex items-center justify-center space-x-2"
                      >
                        <FaCheckCircle />
                        <span>{category.questions[currentQuestion][`${modelKey}Name`]}</span>
                      </button>
                    </motion.div>  
                  </motion.div>
                ))}
              </>
            ) : (
              <motion.div
                className={`flex flex-col relative justify-around items-center ${
                  feedback === "correct" ? "bg-green-500" : feedback === "incorrect" ? "bg-red-500" : ""
                }`}
                initial={{ opacity: 0, scale: 0.8, y: -50 }}
                animate={{ 
                  opacity: 1, 
                  scale: feedback === "incorrect" ? 1 : 1.1, 
                  y: 0 
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    setFeedback(null); 
                  }, 1000);
                }}
              >

                {/* Background Animation */}
                <motion.div
                  className="absolute inset-0"
                  initial={{
                    opacity: 0.2,
                    backgroundColor:`${ feedback === "correct" ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)"}`
                  }}
                  animate={{
                    backgroundColor: "rgba(255, 255, 255, 0)", 
                  }}
                  transition={{
                    duration: 1, 
                  }}
                  style={{
                    pointerEvents: "none",
                    zIndex: -1,
                  }}
                ></motion.div>

                {/* Confetti Effect for Correct Answer */}
                {(feedback === "correct" || themeName !== "Quiz") && (
                <>
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
                        opacity: [1, 1, 0],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, -80, 350],
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
                  </>
                )}

                {/* New Effect for Incorrect Answer */}
                {feedback === "incorrect" && themeName === "Quiz" && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: 0 }}
                    animate={{ x: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="absolute inset-0 bg-red-500 opacity-30"
                      style={{ zIndex: 1 }}
                    ></div>
                    {[...Array(5)].map((_, index) => (
                      <motion.div
                        key={`xmark-${index}`}
                        className="absolute w-6 h-6"
                        style={{
                          background: `linear-gradient(45deg, #FF0000, #FF6347)`,
                          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [1, 0],
                          rotate: [0, 360],
                          scale: [0.8, 1.2],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: Math.random() * 0.5,
                          repeat: 1,
                        }}
                      ></motion.div>
                    ))}
                  </motion.div>
                )}


              <model-viewer
                src={selectedModel}
                camera-controls
                auto-rotate
                rotation-per-second="45deg"
                className="z-10 relative"
                style={{
                  width: isSmallScreen ? "40vw" : "40vh",
                  height: isSmallScreen ? "30vh" : "40vh",
                }} 
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
              category={category}
              modelUrl={selectedModel}
              modelARUrl={selectedModelAR}
              categoryId={categoryId}
              themeIndex={themeIndex}
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
