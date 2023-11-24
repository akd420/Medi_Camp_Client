import { Link } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar";
import Footer from "../Components/Shared/Footer";
import CustomButton from "../Components/Shared/CustomButton";
import Lottie from "lottie-react";
import lott from "../assets/lottie.json";
import CustomContainer from "../Components/Shared/CustomContainer";
import { motion, useScroll, useSpring } from "framer-motion";
const NotFound = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    top: "5rem",
  });
  return (
    <div>
      <NavBar></NavBar>
      <motion.div
        className="fixed top-18 left-0 right-0 h-3 bg-rose origin-[0] z-50"
        style={{ scaleX }}
      />
      <CustomContainer>
        <div className=" text-center">
          <div className="mb-5">
            <div className="md:w-96 mx-auto">
              <Lottie animationData={lott} />
            </div>
            <h2 className="md:text-6xl text-3xl font-bold">
              WHOOPS… PAGE NOT FOUND
            </h2>
            <p className="font-semibold my-3">
              Page does not exist or some other error occurred. Go to our{" "}
              <span className="text-rose">
                <Link to={"/"}>Home page</Link>
              </span>
            </p>
            <Link>
              <CustomButton>Back to Home</CustomButton>
            </Link>
          </div>
        </div>
      </CustomContainer>
      <Footer></Footer>
    </div>
  );
};

export default NotFound;
