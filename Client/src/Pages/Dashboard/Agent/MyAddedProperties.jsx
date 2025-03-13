import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyAddedProperties = () => {
  const axiosSecure = useAxiosSecure()

const navigate = useNavigate()
    const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchProperties = async () => {
      try {
        const res = await axiosSecure.get(`${import.meta.env.VITE_URL}/properties/${user.email}`);
        setProperties(res.data);
      } catch (err) {
        setError("Error fetching properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [user?.email]);

  // delete functionality
  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`${import.meta.env.VITE_URL}/property/${id}`);
      toast.success("Your Property Deleted Successfully!!!");
      setProperties((prevProperties) => prevProperties.filter((property) => property._id !== id));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <div key={property._id} className="border p-4 rounded-lg shadow-md">
            <img
              src={property?.propertyImage}
              alt={property?.propertyTitle}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{property?.propertyTitle}</h3>
            <p className="text-gray-600">{property?.propertyLocation}</p>
            <div className="flex items-center mt-2">
              <img
                src={property?.agent?.image}
                alt={property?.agent?.name}
                className="w-10 h-10 rounded-full"
              />
              <p className="ml-2 font-medium">{property?.agent?.name}</p>
            </div>
            <p className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  property.status === "accepted"
                    ? "bg-green-500 text-white"
                    : property.status === "rejected"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {property.status}
              </span>
            </p>
            <p className="mt-2">
              <span className="font-semibold">Price Range:</span> ${property?.priceRange?.minRange} - ${property?.priceRange?.maxRange}
            </p>
            <div className="flex mt-4 gap-2">
              {property.status !== "rejected" && (
                <button onClick={()=>navigate(`/dashboard/updateProperty/${property._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Update
                </button>
              )}
              <button
                onClick={() => modernDelete(property._id)} 
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default MyAddedProperties;