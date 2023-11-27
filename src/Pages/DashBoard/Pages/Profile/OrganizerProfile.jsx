import CustomContainer from "../../../../Components/Shared/CustomContainer";
import Loading from "../../../../Components/Shared/Loading";
import ProfileCard from "../../../../Components/Shared/ProfileCard";
import useAuth from "../../../../Hooks/useAuth";

const OrganizerProfile = () => {
  const { userData } = useAuth();
  console.log(userData);
  return (
    <div>
      {!userData ? (
        <Loading></Loading>
      ) : (
        <CustomContainer>
          <ProfileCard userData={userData}></ProfileCard>
        </CustomContainer>
        
      )}
    </div>
  );
};

export default OrganizerProfile;
