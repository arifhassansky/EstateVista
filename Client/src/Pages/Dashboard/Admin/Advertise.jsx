import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Advertise = () => {
  const axiosSecure = useAxiosSecure()

    const navigate  = useNavigate()
  const {
    data: advertises,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL}/allProperties/?status=accepted`
      );
      return data;
    },
  });

   // Mutation to mark property as advertised
   const advertiseMutation = useMutation({
    mutationFn: async (propertyId) => {
      await axiosSecure.put(`${import.meta.env.VITE_URL}/advertise-property/${propertyId}`);
    },
    onSuccess: () => {
      toast.success("Property Advertised Successfully!");
      refetch(); 
    },
    onError: () => {
      toast.error("Failed to Advertise Property.");
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center my-8">Advertise Property</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-left shadow-lg rounded-lg">
          <thead className="bg-primary/60 text-white">
            <tr>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Property Title</th>
              <th className="py-3 px-6">Price Range</th>
              <th className="py-3 px-6">Agent Name</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {advertises?.map((property) => (
              <tr key={property._id} className="border-b hover:bg-gray-100 font-semibold text-gray-600">
                <td className="px-4 py-2">
                  <img src={property.propertyImage} alt={property.title} className="w-16 h-16 rounded-md object-cover" />
                </td>
                <td className="px-4 py-2">{property.propertyTitle}</td>
                <td className="px-4 py-2">${property.priceRange.minRange} - ${property.priceRange.maxRange}</td>
                <td className="px-4 py-2">{property.agent.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
                    disabled={advertiseMutation.isLoading}
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advertise;