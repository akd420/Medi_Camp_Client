import { Helmet } from "react-helmet-async";
import CustomContainer from "../../Components/Shared/CustomContainer";
import Testimonials from "../../Components/Testimonials";
import Banner from "./Banner";
import Faq from "./Faq";
import NewsLetter from "./NewsLetter";
import PopularCamps from "./PopularCamps";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Medicamp | Home</title>
            </Helmet>
            <CustomContainer>
                <Banner></Banner>
                <PopularCamps></PopularCamps>
                <Testimonials></Testimonials>
                <Faq></Faq>
                <NewsLetter></NewsLetter>
            </CustomContainer>
        </div>
    );
};

export default Home;