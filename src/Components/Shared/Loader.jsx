import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const Loader = (url, query) => {
  const axiosSecure = useAxios();
  const { isLoading, refetch, data } = useQuery({
    queryKey: [`${query}`],
    queryFn: async () => {
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return { isLoading, data, refetch };
};

export default Loader;