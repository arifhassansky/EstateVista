import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
// react icons
import {MdDelete} from "react-icons/md";
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageReviews = () => {
  const axiosSecure = useAxiosSecure()

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_URL}/reviews`
      );
      return data;
    },
  });

  // Delete Review
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`${import.meta.env.VITE_URL}/reviews/${id}`);
    },
    onSuccess: () => {
      refetch(); 
      toast.success("Review deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete the review.");
    }
  });

  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <p>Are you <b>sure?</b></p>
        <div className="flex gap-2">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              deleteMutation.mutate(id);
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


    return (
     <div className='container mx-auto p-6'>
        <h2 className="text-4xl font-bold text-center my-8">Manage Reviews</h2>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
       {reviews?.map((review)=>(
               <div
               className="w-full  shadow-md h-[350px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">
       
               {/*  icons  */}
               <div
                   className="absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]">
                   <MdDelete onClick={() => modernDelete(review._id)} className="text-[1.3rem] text-white bg-primary hover:bg-secondary p-1 rounded-full"/>
                   
               </div>
       
               {/*  image  */}
               <img
                   src={review.image}
                   alt={review.name}
                   className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out"/>
       
               {/*  texts  */}
               <div className="absolute bottom-0 left-0 py-[20px] pb-[40px] px-[20px] w-full">
                   <p className="text-[1rem]  text-gray-600">{review.email}</p>
                   <h3 className="text-[1.4rem] font-bold text-gray-900">{review.comment}</h3>
                   <p className="text-[0.9rem] text-gray-600 mt-2">{review.name}</p>
               </div>
           </div>
        ))}
       </div>
     </div>
    );
};

export default ManageReviews;