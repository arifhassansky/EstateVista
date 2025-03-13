import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user } = useContext(AuthContext); 
    const email = user?.email;
    const axiosSecure = useAxiosSecure()
    const { data: userData } = useQuery({
      queryKey: ["user", email],

      queryFn: async () => {
        const res = await axiosSecure.get(`${import.meta.env.VITE_URL}/user/${email}`);
        return res.data;
      },
      enabled: !!email, 
    });
  
    return [userData] ;
 
};

export default useUser;