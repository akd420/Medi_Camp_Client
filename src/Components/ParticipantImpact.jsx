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

const ParticipantImpact = () => {
  const { user, camps, isLoading, refetch } = useAuth();
  const {
    isLoading: campLoading,
    refetch: campRefetch,
    data: registeredCamps,
  } = Loader(`registeredCamp?email=${user?.email}`, "registeredCamps");
  const campIds = registeredCamps?.map((camp) => camp?.campId);
  const filteredCamps = camps?.filter((camp) => campIds?.includes(camp._id));
  const dashboard = true;

  const medicalAreas = new Set();

  filteredCamps?.forEach((camp) => {
    medicalAreas.add(getModifiedTargetAudienceName(camp.targetAudience));
  });

  const uniqueMedicalAreas = Array.from(medicalAreas); 

  return (
    <div className="my-12">
      {/* organized camps section  */}
      {isLoading ? (
        <Loading></Loading>
      ) : filteredCamps.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Participated"} sub={"Camps"}></Heading>
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
          <Heading main={"No Organized"} sub={"Camps Found"}></Heading>
        </div>
      )}
      {/* medical areas interested  */}
      {isLoading ? (
        <Loading></Loading>
      ) : uniqueMedicalAreas.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Medical Areas"} sub={"Interested"}></Heading>
          </div>
          <div>
            {uniqueMedicalAreas.map((area) => (
              <div key={area}>
                <ul className="list-disc">
                  <li className="text-3xl">{area}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-12">
          <Heading
            main={"No Medical Areas"}
            sub={"Interested Yet"}
          ></Heading>
        </div>
      )}
    </div>
  );
};

export default ParticipantImpact;
