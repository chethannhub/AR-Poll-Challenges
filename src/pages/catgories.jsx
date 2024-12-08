import React from "react";
import { Link, useParams } from "react-router-dom";
import { thisOrThatData } from "../data/thisOrThatData";
import { quizData } from "../data/quizData";

const Categories = () => {
    const { themeIndex } = useParams();

    let categories;
    let themeName;
    
    if (themeIndex == 0) {
        categories = quizData.categories;
        themeName = quizData.themeState;
    } else if (themeIndex == 1) {
        categories = thisOrThatData.categories;
        themeName = thisOrThatData.themeState;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center">
            <Link
                to="/"
                className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Back
            </Link>
            <h2 className="text-3xl font-bold text-blue-700 mb-2 mt-6 text-center">
                {themeName}
            </h2>

            <h3 className="text-xl font-bold text-gray-600 mb-6 text-center">
                Choose a Poll
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {categories?.map((category, idx) => (
                    <div
                    key={idx}
                    className="bg-white flex flex-col justify-center shadow-lg rounded-lg p-6 text-center transition-transform hover:scale-105"
                    >
                        <h3 className="text-xl font-medium mb-2">{category.categoryName}</h3>

                        <div className="h-44 w-full overflow-hidden rounded-t-lg">
                            <img
                            src={category.cardImg}
                            className="w-full h-full object-cover"
                            alt={category.categoryName}
                            />
                        </div>

                        <Link
                            to={`/poll/${themeIndex}/${idx}`}
                            state={{ category }}
                            className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Start Poll
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Categories;
