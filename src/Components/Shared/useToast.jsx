// useToast.js
import { toast } from 'react-hot-toast';

const useToast = () => {
  const success = ({ content, icon }) => {
    return toast.success(content, {
      icon: icon,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const error = ({ content, icon }) => {
    return toast.error(content, {
      icon: icon,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return { success, error };
};

export default useToast;
