/* eslint-disable react/prop-types */
import useAuth from "../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "./CustomButton";
import Heading from "./Heading";
import { axiosSecure } from "../../Hooks/useAxios";
import useToast from "./useToast";
import userLogo from "../../assets/user.png";
import { updateProfile } from "firebase/auth";
const ProfileCard = ({ userData, refetch }) => {
  const { user } = useAuth();
  const photo = user?.photoURL || userLogo
  const toast = useToast();
  let roles = userData.role;
  if (roles === "organizer") {
    roles = "Organizer";
  } else if (roles === "participant") {
    roles = "Participant";
  } else if (roles === "professionals") {
    roles = "Healthcare Professionals";
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const age = form.age.value;
    const gender = form.gender.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const submit = {
      name,
      age,
      gender,
      phone,
      address,
    };
    axiosSecure.put(`/users/${userData._id}`,submit)
    .then((res)=>{
      updateProfile(user, {
        photoURL: image,
      })
      console.log(res);
      if (res.status === 200) {
        document.getElementById(`modal_${userData._id}`).close(true)
        toast.success({ content: "Profile Updated Successfully" });
        refetch();
      }
    })
  };
 

  return (
    <div>
      <div className="h-screen w-full mt-12 bg-gray-50 flex justify-center ">
        <div className="h-56 w-72 absolute flex justify-center items-center">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src={photo}
            alt=""
          />
        </div>

        <div
          className="
          h-56
          mx-4
          w-5/6
          bg-rose
          rounded-3xl
          shadow-md
          sm:w-80 sm:mx-0
        "
        >
          <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
            <h1 className="text-white">Profile</h1>
          </div>

          <div
            className="
            bg-white
            h-auto
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center
            shadow-xl
          "
          >
            <div className="w-full h-1/2 mt-12 mb-6 flex flex-col justify-center items-center space-y-1">
              <h1 className="font-bold">{userData.name}</h1>
              <h1 className="font-bold">Role: {roles}</h1>
              <h1 className="text-gray-700 text-sm">{userData.email}</h1>
              <h1 className="text-gray-700 text-sm">
                Phone: {userData.phone ? userData.phone : "N/A"}
              </h1>
              <h1 className="text-gray-700 text-sm">
                Address: {userData.address ? userData.address : "N/A"}
              </h1>
              <h1 className="text-gray-700 text-sm">
                Age: {userData.age ? userData.age : "N/A"}
              </h1>
              <h1 className="text-gray-700 text-sm">
                Gender: {userData.gender ? userData.gender.toUpperCase() : "N/A"}
              </h1>
              <div
                onClick={() =>
                  document.getElementById(`modal_${userData._id}`).showModal()
                }
              >
                <CustomButton>
                  <FaRegEdit></FaRegEdit>
                  Update
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* update modal section */}
      <dialog id={`modal_${userData._id}`} className="modal">
        <div className="modal-box">
          <div className="my-4">
            <Heading main={"Update"} sub={"Profile"}></Heading>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="image"
                  defaultValue={user?.photoURL}
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
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
                    defaultValue={userData?.age}
                    name="age"
                    placeholder="Your Age"
                    className="input input-bordered w-full"
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
                    defaultValue={ userData?.gender ? userData?.gender : ''}
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
                />
              </label>
            </div>
            <div className="flex justify-center mt-10">
              <CustomButton>
                <input type="submit" value="Submit" />
              </CustomButton>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProfileCard;
