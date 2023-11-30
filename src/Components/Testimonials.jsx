import useAuth from "../Hooks/useAuth";
import Heading from "./Shared/Heading";
import Loader from "./Shared/Loader";
import Loading from "./Shared/Loading";
import ReviewSlider from "./Shared/ReviewSlider";

const Testimonials = () => {
  const { user } = useAuth();
  const { data, isLoading } = Loader(
    `registeredCamp?email=${user?.email}`,
    "registeredCamps"
  );
  const filteredCamps = data?.filter((camp) => camp.review);
  return (
    <div>
      <div className="my-12">
        <Heading main={"Testimonials of Our"} sub={"Camps"}></Heading>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <ReviewSlider filteredCamps={filteredCamps}></ReviewSlider>
      )}
    </div>
  );
};

export default Testimonials;
