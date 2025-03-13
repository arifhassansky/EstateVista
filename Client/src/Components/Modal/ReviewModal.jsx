import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({
  isOpen,
  propertyId,
  closeModal,
  refetch,
  propertyTitle,
}) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (rating < 1 || rating > 5 || !comment.trim()) {
      setError("Please provide a valid rating (1-5) and a comment.");
      return;
    }

    try {
      await axiosSecure.post(
        `${import.meta.env.VITE_URL}/reviews/${propertyId}`,
        {
          propertyTitle,
          rating,
          comment,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        }
      );
      closeModal();
      refetch();
    } catch (error) {
      setError("Error submitting review. Please try again later.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <dialog
      id="reviewModal"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add a Review</h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Rating input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating (1-5):
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full mt-2"
            />
          </div>

          {/* Comment input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comment:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="border border-gray-300 rounded p-2 w-full mt-2"
              placeholder="Write your review here..."
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ReviewModal;
