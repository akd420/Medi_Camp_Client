import CustomButton from "../../../../Components/Shared/CustomButton";
import Heading from "../../../../Components/Shared/Heading";
import useToast from "../../../../Components/Shared/useToast";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";

/* eslint-disable react/prop-types */
const CampDetailsCard = ({ camp, upcoming }) => {
  const { userData, user, refetch } = useAuth();
  const axiosSecure = useAxios();
  const toast = useToast();
  let role = null;
  if (userData) {
    role = userData?.role;
  }
  const {
    campName,
    fees,
    imageURL,
    location,
    professionals,
    participants,
    services,
    targetAudience,
    time,
    description,
    hostEmail,
    _id,
    intPro,
  } = camp;
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
    const growingList = {
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
      services,
      targetAudience,
      time,
      description,
      role,
    };
    {
      !upcoming &&
        axiosSecure
          .post(`/registeredCamps?email=${user?.email}`, submit)
          .then((res) => {
            if (res.status == 200) {
              document.getElementById("my_modal_2").close(true);
              toast.success({ content: "Camp Joined Successfully" });
              axiosSecure
                .put(`/camps/${_id}?email=${user?.email}`, {
                  participants: participants + 1,
                })
            }
          })
          .then(() => {
            refetch();
          })
          .catch((error) => {
            if (error.response && error.response.status === 409) {
              document.getElementById("my_modal_2").close(true);
              toast.error({ content: "You have already joined this camp" });
            } else {
              toast.error({ content: error.message });
            }
          });
    }
    {
      upcoming &&
        axiosSecure
          .post(`/growingList?email=${user?.email}`, growingList)
          .then((res) => {
            if (res.status == 200) {
              document.getElementById("my_modal_2").close(true);
              toast.success({ content: "Camp Joined Successfully" });
              axiosSecure
                .put(`/upcomingCamps/${_id}?email=${user?.email}`, {
                  participants: participants + 1,
                })
            }
          })
          .then(() => {
            refetch();
          })
          .catch((error) => {
            if (error.response && error.response.status === 409) {
              document.getElementById("my_modal_2").close(true);
              toast.error({ content: "You have already joined this camp" });
            } else {
              toast.error({ content: error.message });
            }
          });
    }
  };
  const handleJoin = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const specialty = form.specialty.value;
    const qualification = form.qualification.value;
    const submit = {
      name,
      email,
      phone,
      specialty,
      qualification,
      hostEmail,
      campId: _id,
      campName,
      imageURL,
      location,
      services,
      targetAudience,
      time,
      description,
      confirmation: "Pending",
      role,
    };
    axiosSecure
      .post(`/growingList?email=${user?.email}`, submit)
      .then((res) => {
        if (res.status == 200) {
          document.getElementById("my_modal_3").close(true);
          toast.success({ content: "Camp Joined Successfully" });
          axiosSecure
            .put(`/upcomingCamps/${_id}?email=${user?.email}`, {
              intPro: intPro + 1,
            })
        }
      })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          document.getElementById("my_modal_3").close(true);
          toast.error({ content: "You have already joined this camp" });
        } else {
          toast.error({ content: error.message });
        }
      });
  };
  return (
    <div>
      <main className="my-10">
        <div className="mb-4 md:mb-0 w-full relative">
          <div>
            <h2 className="text-2xl mb-6 md:text-4xl font-semibold text-gray-800 leading-tight">
              {campName}
            </h2>
          </div>
          <img src={imageURL} className="w-full rounded" alt="" />
        </div>

        <div>
          <div className="px-4 mt-12 text-gray-700 text-lg leading-relaxed w-full">
            <h2 className="text-xl font-semibold mb-4">About the Camp</h2>
            <p>
              <span className="font-medium">For:</span> {cat}
            </p>
            <p>
              <span className="font-medium">Services:</span> {services}
            </p>
            {professionals && (
              <p>
                <span className="font-medium">
                  Professionals in Attendance:
                </span>{" "}
                {professionals}
              </p>
            )}
            <p>
              <span className="font-medium">Fees:</span> ${fees}
            </p>
            <p>
              <span className="font-medium">Location:</span> {location}
            </p>
            <p className="pb-6">
              <span className="font-medium">Time:</span> {formattedTime}
            </p>
            <p className="pb-6 text-justify">{description}</p>
            <div>
              {!user && (
                <div>
                  <p className="font-semibold">
                    You Need to login to Join this camp
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ml-4">
          {user && role === "participant" ? (
            <div
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              {upcoming ? (
                <CustomButton>Join Upcoming Camp</CustomButton>
              ) : (
                <CustomButton>Join Camp</CustomButton>
              )}
            </div>
          ) : (
            ""
          )}
          {user && upcoming && role === "professional" ? (
            <div
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <CustomButton>Interested Upcoming</CustomButton>
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
      {/* modal section for participant*/}
      <div>
        <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="my-4">
              {upcoming ? (
                <Heading main={"Join Upcoming"} sub={"Camp"}></Heading>
              ) : (
                <Heading main={"Join"} sub={"Camp"}></Heading>
              )}
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

      {/* modal section for organizer*/}
      <div>
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="my-4">
              <Heading main={"Interested Upcoming"} sub={"Camp"}></Heading>
            </div>
            <form action="" onSubmit={handleJoin}>
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Phone Number</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone Number"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Specialization</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="specialty"
                    placeholder="Your Specialty"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Qualification For This Camp
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="qualification"
                    placeholder="What can you provide for this camp?"
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

export default CampDetailsCard;
