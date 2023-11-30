import toast from "react-hot-toast";
import CustomButton from "./Shared/CustomButton";
import { axiosSecure } from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

/* eslint-disable react/prop-types */
const ProCard = ({ camp, refetch }) => {
  const { user, upCamps, upFetch } = useAuth();
  const filterCamp = upCamps?.find((camps) => camp.campId === camps._id);
  const handleAccept = () => {
    const campPro = filterCamp?.professionals;
    const updatedProfessionals = campPro
      ? `${campPro}, ${camp?.name}`
      : camp?.name;
    console.log(updatedProfessionals);
    axiosSecure
      .put(`/growingList/${camp._id}?email=${user?.email}`, {
        confirmation: "Accepted",
      })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          refetch();
          toast.success("Professional Accepted");
          axiosSecure
            .put(`/upcomingCamps/${camp.campId}?email=${user?.email}`, {
              professionals: updatedProfessionals,
            })
            .then((res) => {
              console.log(res.data);
              if (res.status == 200) {
                upFetch();
              }
            });
        }
      });
  };
  const handleAccepted = () => {
    toast.success("Professional Already Accepted");
  };
  return (
    <div>
      <div className="card bg-base-100 ">
        <div className="card-body text-center">
          <h2 className=" font-bold text-xl">Name: {camp?.name}</h2>
          <p>Phone: {camp?.phone}</p>
          <p>Specialization: {camp?.specialty}</p>
          <p>Qualifications : {camp?.qualification}</p>
          <p>Status : {camp?.confirmation}</p>
          {camp?.confirmation === "Pending" && (
            <div
              onClick={handleAccept}
              className="card-actions justify-center my-5"
            >
              <CustomButton>Accept</CustomButton>
            </div>
          )}

          {camp?.confirmation === "Accepted" && (
            <div
              onClick={handleAccepted}
              className="card-actions justify-center my-5"
            >
              <CustomButton>Accepted</CustomButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProCard;
