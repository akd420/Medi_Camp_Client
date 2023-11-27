import useAuth from "../Hooks/useAuth";
import CampCard from "./Shared/CampCard";
import Heading from "./Shared/Heading";
import Loading from "./Shared/Loading";

const OrganizerImpact = () => {
  const { user, camps, isLoading } = useAuth();
  const filteredCamps = camps.filter((camp) => camp.hostEmail === user.email);
  const dashboard = true;
  return (
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
                {filteredCamps.map((camp) => (
                  <CampCard key={camp._id} camp={camp} dashboard={dashboard}></CampCard>
                ))}
              </div>
            </div>
          )
      ) : (
        <div className="my-12">
          <Heading main={"No"} sub={"Camps Found"}></Heading>
        </div>
      )
      }
    </div>
  );
};

export default OrganizerImpact;
