import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import ReviewModal from "../Components/Modal/ReviewModal";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ViewDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetching the property details
  const {
    data: property,
    isLoading: isPropertyLoading,
    isError: isPropertyError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_URL}/property/${id}`
      );
      return data;
    },
  });

  // Fetching the reviews for the property
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_URL}/reviews/${id}`
      );
      return data;
    },
  });

  // Handle opening and closing the modal for adding reviews
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // post property to the wishlist
  const { mutate: addToWishlist, isLoading: isWishlistLoading } = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post(`${import.meta.env.VITE_URL}/wishlist`, {
        name: user?.displayName,
        email: user?.email,
        propertyId: id,
      });
    },
    onSuccess: () => {
      toast.success("Added to Wishlist!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to add to wishlist");
    },
  });

  return (
    <div>
      {isPropertyLoading || isReviewsLoading ? (
        <div>Loading property and reviews...</div>
      ) : isPropertyError || isReviewsError ? (
        <div>Error loading data. Please try again later.</div>
      ) : (
        <>
          <div className="container mx-auto p-6 lg:p-0">
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                {property?.propertyTitle}
              </h1>
            </header>

            {/* Two-Column Layout */}
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Left Column */}
              <div className="lg:w-2/3">
                <img
                  src={property?.propertyImage}
                  alt={property?.propertyTitle}
                  className="rounded-lg shadow-md w-full"
                />
                <p className="mt-4 text-gray-600">{property?.description}</p>
              </div>

              {/* Right Column */}
              <div>
                <div className="h-[200px] bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Property Details
                    </h2>
                    <p>
                      <strong>Location:</strong> {property?.propertyLocation}
                    </p>
                    <p>
                      <strong>Price Range:</strong> $
                      {property?.priceRange?.minRange} - $
                      {property?.priceRange?.maxRange}
                    </p>
                    <p>
                      <strong>Agent:</strong> :{property?.agent?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => addToWishlist()}
                    disabled={isWishlistLoading}
                    className="mt-4 bg-primary text-white rounded-full p-2 hover:bg-secondary"
                  >
                    <IoMdHeart className="text-xl" />
                  </button>
                </div>

                {/* Reviews Section */}
                <section className="mt-12">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Reviews
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-secondary/80 text-white px-4 py-2 rounded-md hover:bg-primary/80"
                    >
                      Add a Review
                    </button>
                  </div>
                  <div className="space-y-4">
                    {reviews?.length ? (
                      reviews.map((review) => (
                        <div
                          key={review._id}
                          className="p-4 bg-white shadow-md rounded-lg border border-primary/60"
                        >
                          <p>
                            <strong>{review.userId}</strong> ({review.rating}
                            /5): {review.comment}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Reviewed on{" "}
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet. Be the first to leave a review!</p>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && (
              <ReviewModal
                isOpen={isModalOpen}
                propertyTitle={property?.propertyTitle}
                propertyId={id}
                closeModal={handleCloseModal}
                refetch={refetch}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewDetails;
