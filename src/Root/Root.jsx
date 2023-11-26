import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar";
import Footer from "../Components/Shared/Footer";
import { Toaster } from "react-hot-toast";
import { motion, useScroll, useSpring } from "framer-motion";

const Root = () => {
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
      <div className="min-h-[calc(100vh-256px)] lg:min-h-[calc(100vh-296px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Toaster position="center"></Toaster>
    </div>
  );
};

export default Root;
