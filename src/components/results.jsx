import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Results = () => {
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { thisGamePoints } = location.state || { thisGamePoints: 0 };

  useEffect(() => {
    const savedPoints = localStorage.getItem("points");
    const totalPoints = savedPoints ? parseInt(savedPoints, 10) : 0;
    setPoints(totalPoints);
  }, []);

  const handleRestart = () => {
    localStorage.setItem("points", 0);
    navigate("/poll/0", { state: { currentQuestion: 0 } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mt-10">🎉 Poll Results 🎉</h1>
      <div className="bg-white shadow-md rounded-md p-6 mt-6 text-center">
        <h2 className="text-2xl font-semibold">Congratulations!</h2>
        <p className="text-xl mt-2">
          You earned <span className="text-green-600">+{thisGamePoints} points</span> in this game!
        </p>
        <p className="text-xl mt-2">
          Your total score is <span className="text-green-600">{points} points</span>!
        </p>

        <div className="mt-4 ">
          <button
            onClick={() => navigate("/")}
            className="m-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Home
          </button>

          <button
            onClick={handleRestart}
            className="m-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Restart
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Results;
