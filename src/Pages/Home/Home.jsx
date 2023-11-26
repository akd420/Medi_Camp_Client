import CustomContainer from "../../Components/Shared/CustomContainer";
import Banner from "./Banner";
import Faq from "./Faq";
import NewsLetter from "./NewsLetter";
import PopularCamps from "./PopularCamps";

const Home = () => {
    return (
        <div>
            <CustomContainer>
                <Banner></Banner>
                <PopularCamps></PopularCamps>
                <Faq></Faq>
                <NewsLetter></NewsLetter>
            </CustomContainer>
        </div>
    );
};

export default Home;