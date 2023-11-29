import { Helmet } from "react-helmet-async";
import CustomContainer from "../../Components/Shared/CustomContainer";
import Testimonials from "../../Components/Testimonials";
import Banner from "./Banner";
import Faq from "./Faq";
import NewsLetter from "./NewsLetter";
import PopularCamps from "./PopularCamps";
import UpcomingCamps from "./UpcomingCamps";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion,useAnimation } from "framer-motion";
import { BsFillArrowUpCircleFill } from "react-icons/bs";



const Home = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const controls = useAnimation();
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showScrollButton) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [showScrollButton, controls]);
  return (
    <div>
      <Helmet>
        <title>Medicamp | Home</title>
      </Helmet>
      <CustomContainer>
        <div ref={ref}>
        <Banner></Banner>
        <PopularCamps></PopularCamps>
        <Testimonials></Testimonials>
        <UpcomingCamps></UpcomingCamps>
        <Faq></Faq>
        <NewsLetter></NewsLetter>
        </div>
      </CustomContainer>
      {inView ? (
        <motion.button
          className="fixed bottom-6 right-6 text-4xl md:text-5xl text-rose px-4 py-2 rounded-full opacity-0 transition-opacity duration-300 z-10"
          onClick={scrollToTop}
          title="Scroll To Top"
          initial={{ opacity: inView ? 1 : 0 }}
          animate={controls}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <BsFillArrowUpCircleFill />
        </motion.button>
      ) : null}
    </div>
  );
};

export default Home;
