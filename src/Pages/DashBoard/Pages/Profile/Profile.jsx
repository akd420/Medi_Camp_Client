import { Helmet } from "react-helmet-async";
import CustomContainer from "../../../../Components/Shared/CustomContainer";
import Loader from "../../../../Components/Shared/Loader";
import Loading from "../../../../Components/Shared/Loading";
import ProfileCard from "../../../../Components/Shared/ProfileCard";
import useAuth from "../../../../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const {
    isLoading,
    data: userData,
    refetch,
  } = Loader(`users?email=${user?.email}`, "userData");
  return (
    <div>
      <Helmet>
        <title>Medicamp | Profile</title>
      </Helmet>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <CustomContainer>
          <ProfileCard userData={userData} refetch={refetch}></ProfileCard>
        </CustomContainer>
      )}
    </div>
  );
};

export default Profile;
