import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loader from "./Shared/Loader";
import CustomContainer from "./Shared/CustomContainer";
import Loading from "./Shared/Loading";
import CampDetailsCard from "../Pages/DashBoard/Pages/CampDetails/CampDetailsCard";

const UpDetails = () => {
  const { id } = useParams();
  const { isLoading, data: camp } = Loader(
    `/upcomingCamps/${id}`,
    "upCampDetails"
  );
  const upcoming = true;
  return (
    <div>
      <CustomContainer>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <Helmet>
              <title>Medicamp | {camp?.campName}</title>
            </Helmet>
            <CampDetailsCard upcoming={upcoming} camp={camp}></CampDetailsCard>
          </>
        )}
      </CustomContainer>
    </div>
  );
};

export default UpDetails;
