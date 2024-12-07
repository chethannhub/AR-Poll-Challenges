import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../components/data";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mt-10">🎉 AR Poll Categories 🎉</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-6 text-center hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <Link
              to={`/poll/${index}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Start
            </Link>
          </div>
        ))}
      </div>


      <div className=" bg-gray-100 flex flex-col shadow-md rounded-md p-4 m-4 items-center">
        <h1 className="text-base font-bold text-blue-600 mt-2">Your Total Points</h1>
          <p className="text-xl font-medium mt-2">
            <span className="text-green-600">{localStorage.getItem("points")}</span>
          </p>
      </div>
    </div>
  );
};

export default Home;
