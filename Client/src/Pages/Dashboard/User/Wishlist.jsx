import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { CiViewTable } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist= () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("table");
  const queryClient = useQueryClient(); 
 


  // Fetch wishlist properties for the specific logged-in user
  const { data: wishlist, isLoading, isError } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`${import.meta.env.VITE_URL}/wishlist/${user?.email}`);
      return data;
    },
    enabled: !!user, 
  });

  // Mutation to remove property from wishlist
  const { mutate: removeFromWishlist, isLoading: isRemoving } = useMutation({
    mutationFn: async (propertyId) => {
      return await axiosSecure.delete(`${import.meta.env.VITE_URL}/wishlist/${user?.email}/${propertyId}`);
    },
    onSuccess: () => {
      toast.success("Property removed from wishlist!");
      queryClient.invalidateQueries(["wishlist", user?.email]); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to remove property.");
    },
  });


  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (isError) {
    return <div>Error loading wishlist. Please try again later.</div>;
  }

  
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-4xl font-bold text-center mb-8">My Wishlist</h1>

    <div className="flex justify-end gap-4 mb-6">
      <button
        onClick={() => setViewMode("table")}
        className={`${
          viewMode === "table" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
        } px-4 py-2 rounded-md hover:bg-secondary transition`}
      >
        <CiViewTable />
      </button>
      <button
        onClick={() => setViewMode("card")}
        className={`${
          viewMode === "card" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
        } px-4 py-2 rounded-md hover:bg-secondary transition`}
      >
        <BsFillGrid3X3GapFill />
      </button>
    </div>

    {viewMode === "table" ? (
     <div className="overflow-x-auto max-w-[300px] md:max-w-[600px] lg:max-w-full mx-auto">
       <table className="table-auto w-full  text-left dark:bg-black shadow-lg rounded-lg">
        <thead className="bg-primary/60 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Property Image</th>
            <th className="py-3 px-6 text-left">Property Title</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Agent</th>
            <th className="py-3 px-6 text-left">Price Range</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist?.map((item) => (
            <tr key={item?.propertyId} className="border-b hover:bg-gray-100">
              <td className="py-4 px-6">
                <img
                  src={item?.propertyDetails?.propertyImage}
                  alt={item?.propertyDetails?.propertyTitle}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </td>
              <td className="py-4 px-6">{item?.propertyDetails?.propertyTitle}</td>
              <td className="py-4 px-6">{item?.propertyDetails?.propertyLocation}</td>
              <td className="py-4 px-6">{item?.propertyDetails?.agentName}</td>
              <td className="py-4 px-6">
                ${item?.propertyDetails?.priceRange?.minRange} - $
                {item?.propertyDetails?.priceRange?.maxRange}
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => navigate(`/dashboard/makeOffer/${item.propertyId}`)}
                  className="bg-primary text-white px-4 py-2  mr-4 rounded-md hover:bg-secondary"
                >
                  <BiSolidOffer />
                </button>
                <button
                  onClick={() => removeFromWishlist(item.propertyId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                  disabled={isRemoving}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist?.map((item) => (
          <div
            key={item?.propertyId}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <img
              src={item?.propertyDetails?.propertyImage}
              alt={item?.propertyDetails?.propertyTitle}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {item?.propertyDetails?.propertyTitle}
            </h2>
            <p className="text-gray-600 mt-2">
              <strong>Location:</strong> {item?.propertyDetails?.propertyLocation}
            </p>
            <p className="text-gray-600 mt-1">
              <strong>Agent:</strong> {item?.propertyDetails?.agent?.name}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <img
                src={item?.propertyDetails?.agent?.image}
                alt={item?.propertyDetails?.agent?.name}
                className="w-8 h-8 rounded-full"
              />
              <span
                className={`${
                  item?.propertyDetails?.status
                    ? "text-green-500"
                    : "text-red-500"
                } text-sm`}
              >
                {item?.propertyDetails?.status ? "accepted" : "Not Verified"}
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              <strong>Price Range:</strong> ${item?.propertyDetails?.priceRange?.minRange} - $
              {item?.propertyDetails?.priceRange?.maxRange}
            </p>
            <div className="mt-4 flex justify-between gap-4">
            <button
                  onClick={() => navigate(`/dashboard/makeOffer/${item.propertyId}`)}
                  className="bg-primary text-white px-4 py-2  mr-4 rounded-md hover:bg-secondary"
                >
                  <BiSolidOffer />
                </button>
              <button
                onClick={() => removeFromWishlist(item.propertyId)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                disabled={isRemoving}
              >
                 <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default Wishlist;