/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
const CustomButton = ({ children }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.1 },
      }}
      className="btn bg-rose text-white btn-xs md:btn-md hover:bg-rose border-none"
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;
