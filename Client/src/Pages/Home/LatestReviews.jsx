import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const LatestReviews = () => {
  const { data: latestReviews = [], isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/latest-reviews`);
      return data;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= latestReviews.length ? 0 : prevIndex + 3
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [latestReviews.length]);

  if (isLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (!latestReviews.length) {
    return <p className="text-center text-xl">No reviews available.</p>;
  }

  return (
    <section className="container mx-auto p-6 my-10">
      <h2 className="text-4xl font-bold text-center my-8">What Our Users Say</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {latestReviews.slice(currentIndex, currentIndex + 3).map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-bold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.propertyTitle}</p>
                </div>
              </div>

              <div className="flex mt-3">
                {[...Array(5)].map((_, index) =>
                  index < review.rating ? (
                    <FaStar key={index} className="text-yellow-500" />
                  ) : (
                    <FaRegStar key={index} className="text-gray-400" />
                  )
                )}
              </div>

              <p className="text-gray-800 mt-4 italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestReviews;
