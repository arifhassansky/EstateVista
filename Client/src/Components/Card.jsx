import React from "react";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ property }) => {
  const navigate = useNavigate();
  const { propertyTitle, propertyLocation, priceRange, propertyImage, _id } =
    property || {};

  return (
    <div>
      <div className="h-[350px] border border-primary/30 rounded-xl shadow-xl hover:scale-105 transition">
        <div className="hover14 column">
          <figure className="w-full h-full overflow-hidden object-cover">
            <img src={propertyImage} className="w-full h-40 rounded-xl" />
          </figure>
        </div>
        <div className="p-4 space-y-2">
          <h1 className="font-semibold">{propertyTitle}</h1>
          <p>{propertyLocation}</p>
         <div className="flex justify-between items-center">
         <p className="text-xs">
            ${priceRange.minRange}-${priceRange.maxRange}
          </p>
          <button
            onClick={() => navigate(`/property/${_id}`)}
            className="py-2 px-2 font-semibold relative inline-flex items-center justify-end overflow-hidden transition-all bg-primary rounded-full hover:bg-secondary group"
          >
            <span className="w-0 h-0 rounded bg-primary absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span>
            <span className="w-full text-white transition-colors duration-300 ease-in-out group-hover:text-white z-10">
              <FaRegEye />
            </span>
          </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
