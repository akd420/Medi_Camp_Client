import CustomContainer from "../../Components/Shared/CustomContainer";
import Banner from "./Banner";
import Faq from "./Faq";
import NewsLetter from "./NewsLetter";

const Home = () => {
    return (
        <div>
            <CustomContainer>
                <Banner></Banner>
                <Faq></Faq>
                <NewsLetter></NewsLetter>
            </CustomContainer>
        </div>
    );
};

export default Home;