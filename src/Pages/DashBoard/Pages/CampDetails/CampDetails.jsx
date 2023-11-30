import { useParams } from "react-router-dom";
import Loader from "../../../../Components/Shared/Loader";
import Loading from "../../../../Components/Shared/Loading";
import CustomContainer from "../../../../Components/Shared/CustomContainer";
import CampDetailsCard from "./CampDetailsCard";
import { Helmet } from "react-helmet-async";

const CampDetails = () => {
  const { id } = useParams();
  const { isLoading, data: camp } = Loader(`/camps/${id}`, "campDetails");

  return (
    <div>
      <CustomContainer>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <Helmet>
              <title>Medicamp | {camp?.campName || "Camp Details"}</title>
            </Helmet>
            <CampDetailsCard camp={camp}></CampDetailsCard>
          </>
        )}
      </CustomContainer>
    </div>
  );
};

export default CampDetails;
