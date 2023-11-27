import { toast } from "react-hot-toast";

const useToast = () => {
  const success = ({ content }) => {
    return toast.success(content, {
      icon: "✅",
      style: {
        zIndex: 9999,
      },
    });
  };

  const error = ({ content }) => {
    return toast.error(content, {
      icon: "❌",
      style: {
        zIndex: 9999,
      },
    });
  };

  return { success, error };
};

export default useToast;
