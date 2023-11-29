import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CustomButton from "./CustomButton";
import useToast from "./useToast";
import Heading from "./Heading";
import useAxios from "../../Hooks/useAxios";

/* eslint-disable react/prop-types */
const CampCard = ({ camp, showJoin, dashboard }) => {
  const { user, userData, refetch } = useAuth();
  const axiosSecure = useAxios();
  const {
    campName,
    fees,
    imageURL,
    location,
    participants,
    professionals,
    services,
    targetAudience,
    time,
    description,
    _id,
    hostEmail,
  } = camp;
  const toast = useToast();
  let role = null;
  if (userData) {
    role = userData?.role;
  }
  const eventDate = new Date(time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedTime = eventDate.toLocaleDateString("en-US", options);
  let cat = targetAudience;
  if (targetAudience === "general") {
    cat = "General Health Checkup";
  } else if (targetAudience === "pediatric") {
    cat = "Pediatric Health Camp";
  } else if (targetAudience === "women") {
    cat = "Women's Health Camp";
  } else if (targetAudience === "senior") {
    cat = "Senior Citizens Health Camp";
  } else if (targetAudience === "dental") {
    cat = "Dental Health Camp";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const age = form.age.value;
    const gender = form.gender.value;
    const fee = form.fee.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const problems = form.problems.value;
    const emergency = form.emergency.value;
    const submit = {
      name,
      email,
      age,
      gender,
      fee,
      phone,
      address,
      problems,
      emergency,
      hostEmail,
      campId: _id,
      payment: "Unpaid",
      confirmation: "Pending",
      campName,
      imageURL,
      location,
      professionals,
      services,
      targetAudience,
      time,
      description,
    };

    axiosSecure
      .post(`/registeredCamps?email=${user?.email}`, submit)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          document.getElementById(`modal_${_id}`).close(true);
          toast.success({ content: "Camp Joined Successfully" });
          axiosSecure
            .put(`/camps/${_id}?email=${user?.email}`, { participants: participants + 1 })
            .then((res) => {
              console.log(res.data);
              refetch();
            });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          document.getElementById(`modal_${_id}`).close(true);
          toast.error({ content: "You have already joined this camp" });
        } else {
          toast.error({ content: error.message });
        }
      });
  };
  return (
    <div>
      <div className="card card-compact bg-base-100 hover:shadow-xl transition">
        <Link to={`/camps/${_id}`}>
          <figure>
            <img
              className="rounded-t-lg md:h-96 w-full md:object-cover"
              src={imageURL}
              alt="Image not Found"
            />
          </figure>
        </Link>
        <div className="card-body flex flex-col">
          <Link to={`/camps/${_id}`}>
            <h2 className="card-title">{campName}</h2>
            {!dashboard && (
              <div>
                <p>
                  <span className="font-medium">Time:</span> {formattedTime}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {location}
                </p>
                <p>
                  <span className="font-medium">Services:</span> {services}
                </p>
                <p>
                  <span className="font-medium">
                    Professionals in Attendance:
                  </span>{" "}
                  {professionals}
                </p>
                <p>
                  <span className="font-medium">For:</span> {cat}
                </p>
                <p>
                  <span className="font-medium">Fees:</span> ${fees}
                </p>
                <p>
                  <span className="font-medium">Participants:</span>{" "}
                  {participants}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {description.split(" ").slice(0, 25).join(" ")}...
                </p>
              </div>
            )}
          </Link>
          <div className="card-actions flex-grow">
            <Link to={`/camps/${_id}`}>
              <CustomButton>Details</CustomButton>
            </Link>
            {user && showJoin && role === "participant" ? (
              <div
                onClick={() =>
                  document.getElementById(`modal_${_id}`).showModal()
                }
              >
                <CustomButton>Join</CustomButton>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* modal section */}
      <div>
        <dialog
          id={`modal_${_id}`}
          className="modal z-[200] modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="my-4">
              <Heading main={"Join"} sub={"Camp"}></Heading>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="name"
                    defaultValue={userData?.name}
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <label className="input-group">
                  <input
                    type="email"
                    name="email"
                    defaultValue={userData?.email}
                    readOnly
                    placeholder="Enter Your Email"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Your Age</span>
                  </label>
                  <label className="input-group">
                    <input
                      type="number"
                      name="age"
                      defaultValue={userData?.age}
                      placeholder="Your Age"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <label className="input-group">
                    <select
                      name="gender"
                      className="select select-bordered w-full"
                      defaultValue={userData?.gender ? userData?.gender : ""}
                      required
                    >
                      <option disabled value="">
                        Select Your Gender. . .
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fees</span>
                  </label>
                  <label className="input-group">
                    <input
                      type="number"
                      name="fee"
                      placeholder="Fees.."
                      defaultValue={fees}
                      readOnly
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Your Phone Number</span>
                  </label>
                  <label className="input-group">
                    <input
                      type="text"
                      name="phone"
                      defaultValue={userData?.phone}
                      placeholder="Your Phone Number"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Your Address</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="address"
                    defaultValue={userData?.address}
                    placeholder="Enter Your Address"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Health Problems</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="problems"
                    placeholder="Why you want to attend this camp?"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Emergency Contacts</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="emergency"
                    placeholder="Enter Emergency Contacts"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="flex justify-center mt-10">
                <CustomButton>
                  <input type="submit" value="Submit" />
                </CustomButton>
              </div>
            </form>
            <div className="modal-action"></div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default CampCard;
