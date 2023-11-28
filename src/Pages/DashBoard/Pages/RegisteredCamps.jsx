import OrganizerRegisteredCamps from "../../../Components/OrganizerRegisteredCamps";
import ParticipantRegisteredCamps from "../../../Components/ParticipantRegisteredCamps";
import Loader from "../../../Components/Shared/Loader";
import Loading from "../../../Components/Shared/Loading";
import useAuth from "../../../Hooks/useAuth";

const RegisteredCamps = () => {
  const { user } = useAuth();

  const {
    isLoading,
    data: userData,
  } = Loader(`users?email=${user?.email}`, "userData");

  return (
    <div className="my-6">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          {/* organizer registered camps */}
          {userData?.role === "organizer" ? (
            <div>
              <OrganizerRegisteredCamps></OrganizerRegisteredCamps>
            </div>
          ) : (
            ""
          )}
          {/* participant's registered camps */}
          {userData.role === "participant" ? (
            <div>
              <ParticipantRegisteredCamps></ParticipantRegisteredCamps>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;
