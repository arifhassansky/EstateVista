import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySoldProperties = () => {
  const axiosSecure = useAxiosSecure()

  const { user } = useContext(AuthContext);
  const {
    data: soldProperties,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_URL}/sold-properties/${user?.email}`
      );
      return data;
    },
  });

   // Calculate total sold amount
   const totalSoldAmount = soldProperties?.reduce(
    (total, property) => total +  parseInt(property.soldPrice),
    0
  ) || 0;
 
  return (
    <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center my-8">My Sold Properties</h2>

          {/* Total Sold Amount Section */}
      <div className=" p-6  text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-700">Total Sold Amount</h3>
        <p className="text-3xl font-bold text-green-600">${totalSoldAmount}</p>
      </div>
      <div className="overflow-x-auto max-w-[300px] md:max-w-[600px] lg:max-w-full mx-auto">
        <table className="table-auto w-full text-left dark:bg-black shadow-lg rounded-lg">
          <thead className="bg-primary/60 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Property Title</th>
              <th className="py-3 px-6 text-left">Property Location</th>
              <th className="py-3 px-6 text-left">Buyer Email</th>
              <th className="py-3 px-6 text-left">Buyer Name</th>
              <th className="py-3 px-6 text-left">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties?.map((property, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 font-semibold text-gray-600"
              >
                <td className="px-4 py-2 text-sm">{property.title}</td>
                <td className="px-4 py-2 text-sm">{property.location}</td>
                <td className="px-4 py-2 text-sm">{property.buyerEmail}</td>
                <td className="px-4 py-2 text-sm">{property.buyerName}</td>
                <td className="px-4 py-2 text-sm">${property.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;
