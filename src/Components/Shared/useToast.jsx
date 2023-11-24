import { toast } from "react-hot-toast";

const useToast = () => {
  const success = ({ content }) => {
    return toast.success(content, {
      icon: "✅",
    });
  };

  const error = ({ content }) => {
    return toast.error(content, {
      icon: "❌",
    });
  };

  return { success, error };
};

export default useToast;
