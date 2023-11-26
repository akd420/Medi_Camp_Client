import { useParams } from "react-router-dom";
import Loader from "../../../../Components/Shared/Loader";
import Loading from "../../../../Components/Shared/Loading";
import CustomContainer from "../../../../Components/Shared/CustomContainer";
import CampDetailsCard from "./CampDetailsCard";

const CampDetails = () => {
  const { id } = useParams();
  const { isLoading, data:camp } = Loader(`/camps/${id}`, "campDetails");

  return (
    <div>
      <CustomContainer>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <CampDetailsCard camp={camp}></CampDetailsCard>
        )}
      </CustomContainer>
    </div>
  );
};

export default CampDetails;
