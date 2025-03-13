import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const axiosSecure = useAxiosSecure()
  
  const { data: users = [], isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`${import.meta.env.VITE_URL}/users`);
      return data;
    },
  });


    /* Update User Role */

  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role }) => {
      const {data}= await  axiosSecure.patch(`${import.meta.env.VITE_URL}/users/${userId}`, { role });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

   /* delete User  */
    
  const deleteUser = useMutation({
    mutationFn: async (userId) => {
      const {data}=await axiosSecure.delete(`${import.meta.env.VITE_URL}/users/${userId}`);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  /* mark as fraud fetching */

  const markAsFraud = useMutation({
    mutationFn: async (userEmail) => {
      const {data} = await axiosSecure.delete(`${import.meta.env.VITE_URL}/fraud-users/${userEmail}`);
      return data;
      
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });


  const handleConfirmAction = () => {
    if (!selectedUser) return;

    if (actionType === "makeAdmin") {
      updateUserRole.mutate({userId: selectedUser, role: "admin" });
    } else if (actionType === "makeAgent") {
      updateUserRole.mutate({ userId: selectedUser, role: "agent" });
    } else if (actionType === "markFraud") {
      markAsFraud.mutate(selectedUser);
    } else if (actionType === "delete") {
      deleteUser.mutate(selectedUser);
    }

    setSelectedUser(null);
    setActionType("");
  };

  if(isPending){
    return <LoadingSpinner></LoadingSpinner>;
  }
    return (
        <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center my-8">Manage Users</h2>
       <div className='overflow-x-auto max-w-[300px] md:max-w-[600px] lg:max-w-full mx-auto'>
       <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">User Name</th>
              <th className="border p-2">User Email</th>
              <th className="border p-2">User Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => {
                        setSelectedUser(user._id);
                        setActionType("makeAdmin");
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Admin
                    </button>
                  )}
                  {user.role !== "agent" && (
                    <button
                      onClick={() => {
                        setSelectedUser(user._id);
                        setActionType("makeAgent");
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                     Agent
                    </button>
                  )}
                  {user.role === "agent" && (
                    <button
                      onClick={() => {
                        setSelectedUser(user?.email);
                        setActionType("markFraud");
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                     Fraud
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedUser(user._id);
                      setActionType("delete");
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
  
        {/* Confirmation Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to {actionType.replace(/([A-Z])/g, " $1").toLowerCase()} this user?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmAction}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default ManageUsers;