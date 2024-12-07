import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../components/data";
import { FaAward, FaPlayCircle, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center">
      <motion.header
        className="w-full text-center py-4 bg-blue-600 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold">Welcome to AR Poll!</h1>
        {/* <p className="mt-2 text-lg flex justify-center items-center">
          <FaPlayCircle className="mr-2 text-yellow-300" /> Discover, Play, and Compete with Friends
        </p> */}
      </motion.header>

      <section className="max-w-2xl w-full px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choose Your Poll Category
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg  rounded-lg p-6 flex flex-col items-center hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-600 text-xl mb-2">
                {category.icon ? (
                  <category.icon />
                ) : (
                  <FaStar className="text-yellow-500" />
                )}
              </div>
              <h3 className="text-xl font-medium text-gray-700">{category.name}</h3>
              <Link
                to={`/poll/${index}`}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Start
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center mt-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 flex justify-center items-center">
          <FaAward className="mr-2 text-yellow-400" /> Your Total Points
        </h3>
        <p className="text-2xl font-bold text-green-600 mt-2">
          {localStorage.getItem("points") || 0}
        </p>
      </motion.section>

      <footer className="w-full py-4 mt-10 bg-blue-600 text-white text-center">
        <p className="text-sm">
          Made with 💙 by 
        </p>
      </footer>
    </div>
  );
};

export default Home;
