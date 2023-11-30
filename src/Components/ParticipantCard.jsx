import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { axiosSecure } from "../Hooks/useAxios";
import CustomButton from "./Shared/CustomButton";

/* eslint-disable react/prop-types */
const ParticipantCard = ({ camp, refetch }) => {
  const { user } = useAuth();
  const handleAccept = () => {
    const submit = {
      name: camp.name,
      email: camp.email,
      phone: camp.phone,
      age: camp.age,
      gender: camp.gender,
      fee: camp.fee,
      address: camp.address,
      emergency: camp.emergency,
      problems: camp.problems,
      hostEmail: camp.hostEmail,
      campId: camp.campId,
      payment: "Unpaid",
      confirmation: "Pending",
      campName: camp.campName,
      imageURL: camp.imageURL,
      location: camp.location,
      time: camp.time,
      services: camp.services,
      targetAudience: camp.targetAudience,
      description: camp.description,
    };
    console.log(submit);
    axiosSecure
      .post(`/registeredCamps?email=${user?.email}`, submit)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          toast.success("Participant Accepted");
          //  delete from growing list
          axiosSecure
            .delete(`/growingList/${camp._id}?email=${user?.email}`, {})
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              toast.error({ content: error.message });
            });
        }
      })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error("Participant have already been Accepted");
        } else {
          toast.error(error.message);
        }
      });
  };
  return (
    <div>
      <div className="card bg-base-100 ">
        <div className="card-body text-center">
          <h2 className=" font-bold text-xl">Name: {camp?.name}</h2>
          <p>Age: {camp?.age}</p>
          <p>Phone: {camp?.phone}</p>
          <p>Gender: {camp?.gender.toUpperCase()}</p>
          <p>Address: {camp?.address}</p>
          <p>Emergency Contact: {camp?.emergency}</p>
          <p>Health Problem : {camp?.problems}</p>
          <div
            onClick={handleAccept}
            className="card-actions justify-center my-5"
          >
            <CustomButton>Accept</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
