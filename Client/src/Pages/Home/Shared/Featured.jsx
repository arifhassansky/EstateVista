import React from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaHome, FaDollarSign, FaQuestionCircle } from "react-icons/fa";
import featured from "../../../assets/slide.jpg";

const Featured = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${featured})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        clipPath: "polygon(0 10%, 100% 0, 100% 90%, 0 100%)",
      }}
      className="relative bg-fixed py-24  overflow-hidden my-10"
    >
      <div className="w-11/12 mx-auto">
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary opacity-60"></div>

        {/* Content */}
        <div className="relative text-white text-center max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-10">Featured</h1>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {/* Card 1 */}
            <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-64 bg-blue-900/80 py-6 shadow-inner hover:scale-105 hover:shadow-lg transition-transform duration-200">
              <FaDollarSign className="text-5xl" />
              <h1 className="text-lg font-semibold">Looking To Buy</h1>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-64 bg-blue-900/80 py-6  shadow-inner hover:scale-105 hover:shadow-lg transition-transform duration-200">
              <FaHome className="text-5xl" />
              <h1 className="text-lg font-semibold">Sell Your Home</h1>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-64 bg-blue-900/80 py-6  shadow-inner hover:scale-105 hover:shadow-lg transition-transform duration-200">
              <FaHandHoldingDollar className="text-5xl" />
              <h1 className="text-lg font-semibold">Rent A Place</h1>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-64 bg-blue-900/80 py-6  shadow-inner hover:scale-105 hover:shadow-lg transition-transform duration-200">
              <FaQuestionCircle className="text-5xl" />
              <h1 className="text-lg font-semibold">Need Help?</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
