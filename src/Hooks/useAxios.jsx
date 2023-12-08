import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
export const baseUrl = "https://medi-camp-server-lake.vercel.app";
// export const baseUrl = "http://localhost:5000";
export const axiosSecure = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const useAxios = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          signOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );
  });
  return axiosSecure;
};

export default useAxios;
