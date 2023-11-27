/* eslint-disable react/prop-types */
import useAuth from "../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "./CustomButton";
const ProfileCard = ({ userData }) => {
  const { user } = useAuth();
  let roles = userData.role;
  if (roles === "organizer") {
    roles = "Organizer";
  } else if (roles === "participant") {
    roles = "Participant";
  } else if (roles === "professionals") {
    roles = "Healthcare Professionals";
  }
  const handleEdit = () => {
    console.log("Edit");
  };

  return (
    <div>
      {/* <div className="flex items-center justify-center mt-12">
        <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-rose border shadow-2xl md:max-w-sm rounded-xl">
          <div className="pb-6">
            <div className="flex flex-wrap justify-center">
              <div className="flex justify-center w-full">
                <div className="relative">
                  <img
                    alt="Profile"
                    src={user?.photoURL}
                    className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-20 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal">
                {userData?.name}
              </h3>
              <h3 className="mb-1 text-2xl font-bold leading-normal">
                Role: {roles}
              </h3>
              <div className="flex flex-row justify-center w-full mx-auto space-x-2 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className=" font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                  Address: {userData.address ? userData.address : "N/A"}
                </div>
              </div>
              <div className=" font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                Age: {userData.age ? userData.address : "N/A"}
              </div>
              <div className="w-full text-center">
                <div className="flex justify-center pt-8 pb-0 lg:pt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="h-screen w-full mt-12 bg-gray-50 flex justify-center ">
        <div className="h-56 w-72 absolute flex justify-center items-center">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src={user?.photoURL}
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
              <div onClick={handleEdit}>
                <CustomButton>
                <FaRegEdit></FaRegEdit>
                    Update
                    </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
