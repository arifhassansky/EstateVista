import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  
  const { data: reviews, isLoading, isError, refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_URL}/my-reviews?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, 
  });
 
  //  deleting a review
  const { mutate: deleteReview } = useMutation({
    mutationFn: async (reviewId) => {
      setDeletingReviewId(reviewId);
      await axiosSecure.delete(`${import.meta.env.VITE_URL}/reviews/${reviewId}`);
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      refetch();
      setDeletingReviewId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to delete review");
      setDeletingReviewId(null);
    },
  });


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
              deleteReview(id);
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
 
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching reviews</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">My Reviews</h1>
      <div className="space-y-6">
        {reviews?.length ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {review.propertyTitle}
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Agent:</strong> {review.agentName}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Reviewed on:</strong>{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Review:</strong> {review.comment}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => modernDelete(review?._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                disabled={deletingReviewId === review._id}
              >
                {deletingReviewId === review._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        ) : (
          <p>No reviews found. You haven't reviewed any property yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;