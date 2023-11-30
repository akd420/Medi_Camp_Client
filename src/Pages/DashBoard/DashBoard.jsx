import Footer from "../../Components/Shared/Footer";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { VscFeedback } from "react-icons/vsc";
import { MdPayments, MdOutlineWarehouse } from "react-icons/md";
import { RiFileEditLine } from "react-icons/ri";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import useToast from "../../Components/Shared/useToast";
import {
  FaClinicMedical,
  FaFileMedicalAlt,
  FaLaptopMedical,
} from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
const DashBoard = () => {
  const { user, signOutUser, userData } = useAuth();
  const toast = useToast();
  let role = null;
  if (userData) {
    role = userData?.role;
  }

  const logOut = () => {
    signOutUser()
      .then(() => {
        toast.success({ content: "Logout Successful" });
      })
      .catch((error) => {
        toast.error({ content: error.message });
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-rose text-white mr-1"
              : "mr-1"
          }
          to={`/dashboard/profile`}
        >
          <CgProfile></CgProfile>
          My Profile
        </NavLink>
      </li>
      <div>
        <hr />
      </div>
      {role === "professional" && (
        <>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold bg-rose text-white mr-1"
                  : "mr-1"
              }
              to={`/dashboard/accepted-camps`}
            >
              <CgProfile></CgProfile>
              Accepted Camps
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
        </>
      )}
      {role === "organizer" && (
        <div>
          <div>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "font-extrabold bg-rose text-white mr-1"
                    : "mr-1"
                }
                to={"/dashboard/add-camp"}
              >
                <FaClinicMedical></FaClinicMedical>
                Add Camp
              </NavLink>
            </li>
            <div>
              <hr />
            </div>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "font-extrabold bg-rose text-white mr-1"
                    : "mr-1"
                }
                to={"/dashboard/add-upcoming-camp"}
              >
                <MdOutlineWarehouse></MdOutlineWarehouse>
                Add Upcoming Camps
              </NavLink>
            </li>
            <div>
              <hr />
            </div>
          </div>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold bg-rose text-white mr-1"
                  : "mr-1"
              }
              to={"/dashboard/manage-camps"}
            >
              <FaFileMedicalAlt></FaFileMedicalAlt>
              Manage Camps
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold bg-rose text-white mr-1"
                  : "mr-1"
              }
              to={"/dashboard/manage-upcoming-camps"}
            >
              <RiFileEditLine></RiFileEditLine>
              Manage Upcoming Camps
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
        </div>
      )}
      {role === "organizer" || role === "participant" ? (
        <>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold bg-rose text-white mr-1"
                  : "mr-1"
              }
              to={"/dashboard/registered-camps"}
            >
              <FaLaptopMedical></FaLaptopMedical>
              Registered Camps
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
        </>
      ) : null}

      {role === "participant" && (
        <>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold bg-rose text-white mr-1"
                  : "mr-1"
              }
              to={"/dashboard/payment-history"}
            >
              <MdPayments></MdPayments>
              Payment History
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold bg-rose text-white mr-1"
                  : "mr-1"
              }
              to={"/dashboard/feedback"}
            >
              <VscFeedback></VscFeedback>
              Feedback
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
        </>
      )}
    </>
  );
  return (
    <div>
      {/* navbar section */}
      <div className="bg-red-200 bg-opacity-50 backdrop-blur-lg">
        <div className="navbar max-w-screen-xl mx-auto p-4">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                htmlFor="my-drawer-2"
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
            <Link to={"/"}>
              <div className="flex items-center ">
                <img
                  className="md:w-2/12 w-6/12 mr-1 md:mr-3"
                  src="/logo.png"
                  alt=""
                />
                <span className="text-lg md:text-2xl">Medi</span>{" "}
                <span className="text-rose text-lg md:text-2xl font-semibold">
                  Camp
                </span>
              </div>
            </Link>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-bottom dropdown-end flex items-center">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} />
                    ) : (
                      <img src="/user.png" />
                    )}
                  </div>
                </label>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row text-center items-center">
                <Link to={"/login"}>
                  <motion.button className="btn bg-rose text-white btn-xs md:btn-md hover:bg-rose border-none">
                    Login
                  </motion.button>
                </Link>
                <p className="text-lg mx-2">or</p>
                <Link to={"/register"}>
                  <motion.button className="btn bg-rose text-white btn-xs md:btn-md hover:bg-rose border-none">
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* dashboard section */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="min-h-[calc(100vh-256px)] lg:min-h-[calc(100vh-296px)]">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side z-0">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-fit min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="text-center mt-5">
              <h1 className="text-rose font-bold">{userData?.name}</h1>
              <h1 className="font-semibold">{userData?.email}</h1>
            </div>
            <div className="md:mt-20 mt-32">{navLinks}</div>
            <div className="mt-48 flex items-end ">
              <div>
                <hr />
              </div>
              <li>
                <a
                  className="text-xl flex justify-center items-center"
                  onClick={logOut}
                >
                  <BiLogOutCircle></BiLogOutCircle>
                  <p>Logout</p>
                </a>
              </li>
              <div>
                <hr />
              </div>
            </div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default DashBoard;
