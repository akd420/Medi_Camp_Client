import Heading from "../../Components/Shared/Heading";
import Loading from "../../Components/Shared/Loading";
import UpCard from "../../Components/UpCard";
import useAuth from "../../Hooks/useAuth";

const UpcomingCamps = () => {
  const { upCamps, upLoading } = useAuth();
  return (
    <div>
      {upCamps?.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Upcoming"} sub={"Camps"}></Heading>
          </div>
          <div>
            {upLoading ? (
              <Loading></Loading>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upCamps?.map((camp) => (
                  <UpCard key={camp._id} camp={camp}></UpCard>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UpcomingCamps;
