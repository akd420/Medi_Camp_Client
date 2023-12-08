import useAuth from "../Hooks/useAuth";
import CampCard from "./Shared/CampCard";
import Heading from "./Shared/Heading";
import Loader from "./Shared/Loader";
import Loading from "./Shared/Loading";

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
        <Loading />
      ) : filteredCamps.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Interested"} sub={"Camps:"}></Heading>
          </div>
          <ul className="px-6">
            {filteredCamps.map((camp) => (
              <li className="list-disc text-2xl font-medium" key={camp._id}>
                {camp.campName}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="my-12">
          <Heading main={"No interested"} sub={"camps found"}></Heading>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : acceptedCamps.length > 0 ? (
        <div>
          <div className="my-12">
            <Heading main={"Accepted"} sub={"Camps"}></Heading>
          </div>
          <ul className="px-6">
            {acceptedCamps.map((camp) => (
              <li className="list-disc text-2xl font-medium" key={camp._id}>
                {camp.campName}
              </li>
            ))}
          </ul>
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
