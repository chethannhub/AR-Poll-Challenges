import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaRedo } from "react-icons/fa";

const Results = () => {
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { thisGamePoints } = location.state || { thisGamePoints: 0 };

  const categoryId = localStorage.getItem("categoryId");

  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    const totalPoints = savedPoints ? parseInt(savedPoints, 10) : 0;
    setPoints(totalPoints);
  }, []);

  const handleRestart = () => {
    localStorage.setItem("points", 0);
    navigate(`/poll/${categoryId}`, { state: { currentQuestion: 0 } });
  };

  return (
    <div className="relative min-h-screen  flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative z-10 bg-white shadow-lg rounded-lg p-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold text-blue-600 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 10,
          }}
        >
          🎉 Poll Results 🎉
        </motion.h1>
        <motion.p
          className="text-lg text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Congratulations on completing the poll!
        </motion.p>
        <motion.p
          className="text-xl mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          You earned <span className="text-green-600 font-bold">+{thisGamePoints} points</span> this game!
        </motion.p>
        <motion.p
          className="text-xl mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Your total score is{" "}
          <span className="text-green-600 font-bold">{points} points</span>.
        </motion.p>

        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHome />
            Home
          </motion.button>

          <motion.button
            onClick={handleRestart}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaRedo />
            Play Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
