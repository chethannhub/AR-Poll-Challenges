import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { quizData } from "../data/quizData";
import { thisOrThatData } from "../data/thisOrThatData";
import { storyData } from "../data/storyData";

const themes = [
  { name: quizData.themeState, image: quizData.themeImg, path:"0" },
  { name: thisOrThatData.themeState, image: thisOrThatData.themeImg, path: "1" },
  { name: storyData.themeState, image: storyData.themeImg, path: "2" },
];
 
const setThemeName = (themeName) => {
  localStorage.setItem("ThemeName", themeName)  
}

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
      </motion.header>

      <section className="w-[500px] max-w-2xl  sm:w-full  px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Choose Your Poll Category
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {themes.map((theme, index) => (
            <Link 
            key={index}
            to={`/theme/${theme.path}`}
            onClick={() => setThemeName(theme.name)}
            >
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-[500px]  sm:h-44 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={theme.image}
                    className="w-full h-full object-cover"
                    alt={theme.name}
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mt-4">
                  {theme.name}
                </h3>
              </motion.div>
            </Link>

          ))}
        </motion.div>
      </section>

      <footer className="w-full absolute bottom-0 py-4 mt-10 bg-blue-600 text-white text-center">
        <p className="text-sm">Made with 💙 by AR Poll Team</p>
      </footer>
    </div>
  );
};

export default Home;
