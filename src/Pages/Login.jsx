import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../Hooks/useAuth";
import useToast from "../Components/Shared/useToast";
import { useState } from "react";
import { axiosSecure } from "../Hooks/useAxios";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser, googleLogin, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    signInUser(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success({ content: "Login Successful" });
        setLoading(false);
      })
      .catch((error) => {
        toast.error({ content: error.message });
        setLoading(false);
      });
  };

  // Handle Google signInUser
  const handleGoogleSignInUser = async () => {
    setLoading(true);

    try {
      const result = await googleLogin();
      const userExists = await checkUserExists(result.user?.email);

      if (userExists) {
        navigate(location?.state ? location.state : "/");
        toast.success({ content: "Login Successful" });
      } else {
        setShowRoleModal(true);
        toast.success({ content: "Login Successful" });
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
        <title>Medicamp | Login</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl text-rose font-bold">Log In</h1>
            <p className="text-sm ">Sign in to access your account</p>
          </div>
          <form
            onSubmit={handleSubmit}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
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
                  autoComplete="current-password"
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
                  "Continue"
                )}
              </button>
            </div>
          </form>
          {/* modal section */}
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
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div>
            <button
              onClick={handleGoogleSignInUser}
              className="bg-rose w-full rounded-md py-3 text-white my-2"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                <div className="flex items-center justify-center gap-6">
                  <FcGoogle size={25} />
                  <p>Continue with Google</p>
                </div>
              )}
            </button>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-rose-500 text-rose"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
