import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaRegEye } from "react-icons/fa";
const AdvertisementSection = () => {
  const navigate = useNavigate();

  // Fetch advertised properties
  const { data: advertisedProperties = [], isLoading } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/advertised-properties`);
      return data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-xl">Loading...</p>;
  }


  const settings = {
    dots: true,
    infinite: true, // Ensure infinite looping
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1, // Change only one card at a time for a smooth effect
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed (2 seconds)
    pauseOnHover: true, // Pause on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1, // Adjust to scroll one card at a time
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <section className="container mx-auto p-6 my-10">
      <h2 className="text-4xl font-bold text-center my-8">Featured Properties</h2>

      
      <Slider {...settings}>
        {advertisedProperties.map((property) => (
          <div key={property._id} className="bg-primary/10 p-4 h-[400px]">
            <img
              src={property.propertyImage}
              alt={property.propertyTitle}
              className="w-full h-56 rounded-md object-cover"
            />
            <h3 className="text-lg font-bold mt-4">{property.propertyTitle}</h3>
            <p className="text-sm text-gray-600">{property.propertyLocation}</p>
            <p className="text-gray-800 font-semibold">
              Price: ${property.priceRange.minRange} - ${property.priceRange.maxRange}
            </p>
            <div className="flex justify-between items-center">
            <p className={`font-semibold mt-2 ${property.status === "accepted" ? "text-green-600" : "text-red-600"}`}>
              {property.status === "accepted" ? "Verified " : "Pending "}
            </p>
            <button
              onClick={() => navigate(`/property/${property._id}`)}
              className="mt-4 bg-primary text-md text-white p-2 rounded-full hover:bg-primary/80 transition"
            >
              <FaRegEye />
            </button>
            </div>
          </div>
        ))}
         </Slider>
      
    </section>
  );
};

export default AdvertisementSection;