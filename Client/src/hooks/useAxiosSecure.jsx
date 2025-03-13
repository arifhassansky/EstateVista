import axios from "axios";
import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
//   const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await logOut();
        // navigate("/login");
      }

      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;