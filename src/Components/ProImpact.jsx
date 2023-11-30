import useAuth from "../Hooks/useAuth";
import CampCard from "./Shared/CampCard";
import Heading from "./Shared/Heading";
import Loader from "./Shared/Loader";
import Loading from "./Shared/Loading";

const getModifiedTargetAudienceName = (targetAudience) => {
  switch (targetAudience) {
    case "general":
      return "General Health Checkup";
    case "pediatric":
      return "Pediatric Health Camp";
    case "women":
      return "Women's Health Camp";
    case "senior":
      return "Senior Citizens Health Camp";
    case "dental":
      return "Dental Health Camp";
    default:
      return targetAudience;
  }
};

const ProImpact = () => {
  const { user } = useAuth();
  const dashboard = true;
  const { data: grow, isLoading } = Loader(
    `growingLists?email=${user?.email}`,
    "getGrowingLists"
  );
  const filteredCamps = grow?.filter((camp) => camp?.email === user?.email);
  const acceptedCamps = filteredCamps?.filter(
    (camp) => camp?.confirmation === "Accepted"
  );
  return (
    <div className="my-12">
      {isLoading ? (
        <Loading></Loading>
      ) : filteredCamps.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Interested"} sub={"Camps"}></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCamps.map((camp) => (
              <CampCard
                key={camp._id}
                camp={camp}
                dashboard={dashboard}
              ></CampCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-12">
          <Heading main={"No Interested"} sub={"Camps Found"}></Heading>
        </div>
      )}
      {isLoading ? (
        <Loading></Loading>
      ) : acceptedCamps.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Accepted"} sub={"Camps"}></Heading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {acceptedCamps.map((camp) => (
              <CampCard
                key={camp._id}
                camp={camp}
                dashboard={dashboard}
              ></CampCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-12">
          <Heading main={"No Accepted"} sub={"Camps Found"}></Heading>
        </div>
      )}
    </div>
  );
};

export default ProImpact;
