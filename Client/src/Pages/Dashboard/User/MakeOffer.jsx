import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeOffer = () => {
    const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [error, setError] = useState("");
  
  const { data : property , isLoading, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`${import.meta.env.VITE_URL}/property/${id}`);
      return data;
    },
  });

  const handleOffer = async (e) => {
    e.preventDefault();

    if (!user || user.role === "admin" || user.role === "agent") {
      toast.error("Only users can make an offer!");
      return;
    }

    if (!property) {
      toast.error("Property details not found!");
      return;
    }


    if (offerAmount < property.priceRange.minRange|| offerAmount > property.priceRange.maxRange) {
      toast.error(
        `Offer must be between ${property.priceRange.minRange} and ${property.priceRange.maxRange}`
      );
      return;
    }

    const offer = {
      property,
      offerAmount,
      buyingDate,
      email: user.email,
      name: user.displayName,
      status :"pending"
    }
    try {
      await axiosSecure.post(`${import.meta.env.VITE_URL}/make-offer`,offer)
      .then(data => {
        if(data.data.insertedId){
          toast.success("Offer made successfully!");
          navigate("/dashboard/property-bought");
        }
      })

      
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to make an offer");
    }
  };

  
  if (!property) return <div>Loading property details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <img
        src={property.propertyImage}
        alt={property.propertyTitle}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">
        Make an Offer for {property.propertyTitle}
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleOffer}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
    {/* Left Column */}
    <div className="space-y-6">
      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">Property Title</label>
        <input
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          type="text"
          value={property.propertyTitle}
          readOnly
        />
      </div>

      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">Property Location</label>
        <input
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          type="text"
          value={property.propertyLocation}
          readOnly
        />
      </div>

      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">Agent Name</label>
        <input
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          type="text"
          value={property.agent.name}
          readOnly
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">Buyer Email</label>
        <input
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          type="email"
          value={user?.email}
          readOnly
        />
      </div>

      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">Buyer Name</label>
        <input
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          type="text"
          value={user?.displayName}
          readOnly
        />
      </div>

      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">
          Offer Amount (Between {property.priceRange.minRange} and {property.priceRange.maxRange})
        </label>
        <input
          type="number"
          placeholder={`Enter an amount between ${property.priceRange.minRange} and ${property.priceRange.maxRange}`}
          value={offerAmount}
          onChange={(e) => setOfferAmount(e.target.value)}
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          required
        />
      </div>

      <div className="space-y-1 text-sm">
        <label className="block text-gray-600">Buying Date</label>
        <input
          type="date"
          value={buyingDate}
          onChange={(e) => setBuyingDate(e.target.value)}
          className="w-full px-4 py-3 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
          required
        />
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md w-full mt-6">
    Submit Offer
  </button>
      </form>
    </div>
  );
};

export default MakeOffer;
