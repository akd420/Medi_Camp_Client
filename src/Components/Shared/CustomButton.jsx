/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
const CustomButton = ({ children,onClick }) => {
  return (
    <motion.button onClick={onClick}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.1 },
      }}
      className="btn bg-rose text-white hover:bg-rose border-none"
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;
