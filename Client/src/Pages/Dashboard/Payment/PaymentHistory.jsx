import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()

  const {
    data: payments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `${import.meta.env.VITE_URL}/payments/${user?.email}`
      );
      return data;
    },
  });

  console.log(payments);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center my-8">Payment History</h2>

      <div className="overflow-x-auto max-w-[300px] md:max-w-[600px] lg:max-w-full mx-auto">
        <table className="table-auto w-full text-left dark:bg-black shadow-lg rounded-lg">
          <thead className="bg-primary/60 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Transaction Id</th>
              <th className="py-3 px-6 text-left">Price</th>

              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr key={payment?._id} className="border-b hover:bg-gray-100 font-semibold text-gray-600">
                <td className="py-4 px-6">{payment.email}</td>
                <td className="py-4 px-6">{payment.transactionId}</td>
                <td className="py-4 px-6">{payment.price}</td>
                <td className="py-4 px-6">{payment.date}</td>
                <td className="py-4 px-6 text-green-600">{payment.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
