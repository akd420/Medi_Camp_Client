import useAuth from "../Hooks/useAuth";
import CampCard from "./Shared/CampCard";
import Heading from "./Shared/Heading";
import Loader from "./Shared/Loader";
import Loading from "./Shared/Loading";
import ReviewSlider from "./Shared/ReviewSlider";
import CustomContainer from "./Shared/CustomContainer";
import ReviewCard from "./ReviewCard";

const OrganizerImpact = () => {
  const { user, camps, isLoading } = useAuth();
  const { data, isLoading:reviewLoading } = Loader(
    `registeredCamp?email=${user?.email}`,
    "registeredCamps"
  );
  const filterByReview = data?.filter((camp)=>camp.review)
  const filterReviewHostEmail = filterByReview?.filter((camp)=>camp.hostEmail === user?.email)
  const filteredCamps = camps.filter((camp) => camp.hostEmail === user.email);
  const dashboard = true;
  return (
    <>
    <div className="my-12">
      {/* organized camps section  */}
      {isLoading ? (
        <Loading></Loading>
      ) : filteredCamps.length>0 ? (
        (
            <div>
              <div className="my-12">
                <Heading main={"Organized"} sub={"Camps"}></Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCamps?.map((camp) => (
                  <CampCard key={camp._id} camp={camp} dashboard={dashboard}></CampCard>
                ))}
              </div>
            </div>
          )
      ) : (
        <div className="my-12">
          <Heading main={"No Organized"} sub={"Camps Found"}></Heading>
        </div>
      )
      }
    </div>
    <div>
      <div className="my-12">
        <Heading main={"Feedbacks of Your"} sub={"Camps"}></Heading>
      </div>
      {
        reviewLoading ? (
            <Loading></Loading>
        ) : (
            <CustomContainer>
            <div>
              {
                filterReviewHostEmail.length>0 ?(
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {
                    filterReviewHostEmail?.map((camp)=><ReviewCard key={camp._id} camp={camp}></ReviewCard>)
                  }
                 </div>
                ) : (
                  <div className="my-12">
                    <Heading main={"No Feedbacks"} sub={"Found"}></Heading>
                  </div>
                )
              }
            </div>
            </CustomContainer>
        )
      }
    </div>
    </>
  );
};

export default OrganizerImpact;
