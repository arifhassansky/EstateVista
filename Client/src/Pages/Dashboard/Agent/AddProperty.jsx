import React, { useContext, useState } from "react";
import { imageUpload } from "../../../api/Utils";

import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload" },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const propertyTitle = form.propertyTitle.value;
    const propertyLocation = form.propertyLocation.value;
    const description = form.description.value;
    const minRange = parseInt(form.minPrice.value);
    const maxRange = parseInt(form.maxPrice.value);
    const propertyImage = form.image.files[0];
    const imageUrl = await imageUpload(propertyImage);

    // agent info
    const agent = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const priceRange = {
      minRange,
      maxRange,
    };
    // Create property data object
    const propertyData = {
      propertyTitle,
      propertyLocation,
      description,
      priceRange,
      propertyImage: imageUrl,
      agent,
      status: "pending",
    };

    console.table(propertyData);
    // save property in db
    try {
      // post req
      await axiosSecure.post(
        `${import.meta.env.VITE_URL}/add-property`,
        propertyData
      );
      toast.success("Property Added Successfully!");
      navigate("/dashboard/my-added-properties");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
                name="propertyTitle"
                id="name"
                type="text"
                placeholder="Property Title"
                required
              />
            </div>
            {/* Category */}

            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
                name="propertyLocation"
                id="name"
                type="text"
                placeholder="Property Location"
                required
              />
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write property description here..."
                className="block rounded-md focus:primary/60 w-full h-32 px-4 py-3 text-gray-800  border  bg-white border-primary/30 focus:outline-primary/60  "
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* minPrice & maxPrice */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="minPrice" className="block text-gray-600 ">
                  Minimum Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
                  name="minPrice"
                  id="minPrice"
                  type="number"
                  placeholder="Enter Minimum Price"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="maxPrice" className="block text-gray-600">
                  Maximum Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-primary/30 focus:outline-primary/60 rounded-md bg-white"
                  name="maxPrice"
                  id="maxPrice"
                  type="number"
                  placeholder="Maximum Price"
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) =>
                        setUploadImage({
                          image: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />

                    <div className="bg-primary/80 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-secondary/80">
                      {uploadImage?.image?.name}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {uploadImage && uploadImage?.image?.size && (
              <div className="flex gap-5 items-center">
                <img className="w-20" src={uploadImage?.url} alt="" />
                <p>Image Size: {uploadImage?.image?.size} Bytes</p>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-primary hover:bg-secondary"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddProperty;
