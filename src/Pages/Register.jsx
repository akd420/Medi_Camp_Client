import { updateProfile } from "firebase/auth";
import useToast from "../Components/Shared/useToast";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { axiosSecure } from "../Hooks/useAxios";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { googleLogin, createUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { user } = useAuth();
  const handleRoleSelect = async (role) => {
    try {
      await postDataToDatabase({
        name: user?.displayName,
        email: user?.email,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
    setShowRoleModal(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // validation
    if (password.length < 6) {
      toast.error({ content: "Password must be at least 6 characters" });
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error({ content: "Password must contain at least one uppercase" });
      return;
    } else if (!/[!@#$%^&*()_+]/.test(password)) {
      toast.error({
        content: "Password must contain at least one special character",
      });
      return;
    }
    setLoading(true);
    try {
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: image,
      });

      // Open the role selection after creating a user
      // You can customize the role selection UI as per your design
      setShowRoleModal(true); // Reset selected role
      toast.success({ content: "Registered successfully" });
    } catch (error) {
      toast.error({ content: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await googleLogin();

      // Check if the user already exists in the database
      const userExists = await checkUserExists(result.user?.email);

      if (userExists) {
        // User exists, proceed to navigate
        navigate(location?.state ? location.state : "/");
        toast.success({ content: "Logged in successfully" });
      } else {
        // User doesn't exist, show the role selection modal
        setShowRoleModal(true);
        toast.success({ content: "Registered successfully" });
      }
    } catch (error) {
      toast.error({ content: error.message });
    } finally {
      setLoading(false);
    }
  };

  const postDataToDatabase = async (data) => {
    try {
      await axiosSecure.post("users", data);
      navigate(location?.state ? location.state : "/");
      toast.success({ content: "User Saved to Database" });
    } catch (error) {
      toast.error({ content: "Error sending data to the database" });
    }
  };
  const checkUserExists = async (email) => {
    try {
      const response = await axiosSecure.get(`users?email=${email}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error checking user existence");
    }
  };
  return (
    <>
      <Helmet>
        <title>Medicamp | Register</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">
              Welcome to <span className="text-black">Medi</span>
              <span className="text-rose">Camp</span>
            </p>
          </div>
          <form
            onSubmit={handleRegister}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Image Url
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="Enter Your Image Url Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-rose w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          {/* role modal section */}

          {showRoleModal && (
            <div>
              {/* Put this part before </body> tag */}
              <input
                type="checkbox"
                id="my_modal_6"
                className="modal-toggle"
                defaultChecked={showRoleModal}
              />
              <div
                className={`modal ${showRoleModal ? "open" : ""}`}
                role="dialog"
                onClick={() => setShowRoleModal(false)}
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">
                    Select Your <span className="text-rose">Role</span>
                  </h3>
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-6 justify-center items-center">
                      <div
                        className="flex flex-col items-center justify-center m-4"
                        onClick={() => handleRoleSelect("organizer")}
                      >
                        <img
                          src="/Organizer.png"
                          alt=""
                          className="w-20 h-20"
                        />
                        <p className="text-center font-semibold mt-3">
                          Organizer
                        </p>
                      </div>
                      <div
                        className="flex flex-col items-center justify-center m-4"
                        onClick={() => handleRoleSelect("professional")}
                      >
                        <img
                          src="/Professional.png"
                          alt=""
                          className="w-20 h-20"
                        />
                        <p className="text-center font-semibold mt-3">
                          Professional
                        </p>
                      </div>
                      <div
                        className="flex flex-col items-center justify-center m-4"
                        onClick={() => handleRoleSelect("participant")}
                      >
                        <img
                          src="/Participant.png"
                          alt=""
                          className="w-20 h-20"
                        />
                        <p className="text-center font-semibold mt-3">
                          Participant
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div>
            <button
              onClick={handleGoogleLogin}
              className="bg-rose w-full rounded-md py-3 text-white my-2"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <FcGoogle size={25} />
                  <p>Signup with Google</p>
                </div>
              )}
            </button>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-rose"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
