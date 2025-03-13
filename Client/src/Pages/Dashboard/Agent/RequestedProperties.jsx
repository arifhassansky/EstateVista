import React, { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure()

  const { user } = useContext(AuthContext);
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    data: offers = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["requestedProperties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `${import.meta.env.VITE_URL}/req-property/${user?.email}`
      );
      return response.data;
    },
  });


  const updateStatus = async (offerId, propertyId) => {
    try {
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_URL}/req-property/${offerId}`,
        { propertyId }
      );
      setOffer(data);
      refetch()
    } catch (error) {
      console.error(`Error updating status to:`, error);
    }
  };

  const rejectStatus = async(offerId)=>{
    try {
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_URL}/rej-property/${offerId}`
      );
      setOffer(data);
      refetch();
    } catch (error) {
      console.error(`Error updating status to:`, error);
    }
  }
  return (
    <div>
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          Requested Properties
        </h2>

        <div className="overflow-x-auto max-w-[300px] md:max-w-[600px] lg:max-w-full mx-auto">
          <table className="table-auto w-full  border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border">Property Title</th>
                <th className="px-4 py-2 text-left border">Location</th>
                <th className="px-4 py-2 text-left border">Buyer Email</th>
                <th className="px-4 py-2 text-left border">Buyer Name</th>
                <th className="px-4 py-2 text-left border">Offered Price</th>
                <th className="px-4 py-2 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id} className="bg-white border-b">
                  <td className="px-4 py-2">{offer.property.propertyTitle}</td>
                  <td className="px-4 py-2">
                    {offer.property.propertyLocation}
                  </td>
                  <td className="px-4 py-2">{offer.email}</td>
                  <td className="px-4 py-2">{offer.name}</td>
                  <td className="px-4 py-2">${offer.offerAmount}</td>
                  <td className="px-4 py-2">
                    {offer.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(offer._id, offer.property._id)
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            rejectStatus(offer._id)
                          }
                          className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        className={`px-4 py-2 rounded ${
                          offer.status === "accepted"
                            ? "text-green-600 font-bold"
                            : "text-red-600 font-bold"
                        }`}
                      >
                        {offer.status.charAt(0).toUpperCase() +
                          offer.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedProperties;
