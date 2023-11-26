import CampCard from "../../Components/Shared/CampCard";
import CustomContainer from "../../Components/Shared/CustomContainer";
import Heading from "../../Components/Shared/Heading";
import Loading from "../../Components/Shared/Loading";
import useAuth from "../../Hooks/useAuth";

const AvailableCamps = () => {
    const {camps , isLoading} = useAuth();
    const showJoin = true;
    return (
        <div>
            <CustomContainer>
            {
                isLoading ? <Loading></Loading> : <div>
                    <div className="my-12">
                    <Heading main={'Available'} sub={'Camps'}></Heading>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {
                            camps.map((camp)=> <CampCard key={camp._id} camp={camp} showJoin={showJoin}></CampCard>)
                        }
                    </div>
                </div>
            }
            </CustomContainer>
        </div>
    );
};

export default AvailableCamps;