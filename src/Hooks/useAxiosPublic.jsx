import axios from "axios";
export const baseURL = "http://localhost:5173/"

const axiosPublic = axios.create({
    baseURL: baseURL
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;