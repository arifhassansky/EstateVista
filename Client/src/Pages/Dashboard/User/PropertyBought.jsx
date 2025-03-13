import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { SiInstatus } from "react-icons/si";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdRealEstateAgent } from "react-icons/md";
import { Link } from "react-router";

const PropertyBought = () => {
  const { data: offers } = useQuery({
    queryKey: ["userOffers"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_URL}/all-offer`);
      return data;
    },
  });
  console.log(offers);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center font-bold text-4xl mb-8">Property Bought</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers?.map((offer) => (
          <div
            key={offer._id}
            className="group [perspective:1000px] w-full sm:w-[80%] lg:w-[80%] h-[400px]"
          >
            <div className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden [backface-visibility:hidden]">
                <img
                  src={offer.property.propertyImage}
                  alt="animated_card"
                  className="w-full h-full cursor-pointer object-cover rounded-lg shadow-lg"
                />
                <h2 className="text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white absolute bottom-5 left-5">
                  {offer.property.propertyTitle}
                </h2>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-[25px]">
                <h2 className="text-[1.2rem] font-semibold text-gray-800 mb-4">
                  {offer.property.propertyTitle}
                </h2>
                <p className="text-gray-600">
                  {offer.property.description.slice(0, 100)}..
                </p>
                <div className=" flex items-center  gap-2 mt-4">
                  <FaLocationCrosshairs className="text-secondary" />
                  <p className="text-gray-800">
                    {offer.property.propertyLocation}
                  </p>
                </div>
                <div className=" flex items-center  gap-2 ">
                  <MdRealEstateAgent className="text-secondary" />
                  <p className="text-gray-800">{offer.property.agent.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">${offer.offerAmount}</p>
                  <div className="flex items-center justify-end gap-2 ">
                    <SiInstatus className="text-secondary" />
                    <p className="bg-primary/80 rounded-full text-white px-2 py-1">
                      {offer.status}
                    </p>
                  </div>
                </div>
                {offer.status === "accepted" ? (
                  <Link
                    to={`/dashboard/payment/${offer._id}`}
                    className="btn w-full bg-primary hover:bg-secondary text-white my-4"
                  >
                    Pay
                  </Link>
                ) : offer.status === "bought" ? (
                  <p className="text-green-600 font-semibold text-sm">
                    Transaction ID: {offer.transactionId}
                  </p>
                ) : (
                  <button
                    disabled
                    className="btn w-full bg-primary hover:bg-secondary text-white my-4"
                  >
                    Pay
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
