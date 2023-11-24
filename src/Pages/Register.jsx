import { updateProfile } from "firebase/auth";
import useToast from "../Components/Shared/useToast";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
  const { googleLogin, createUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const handleRegister = (e) => {
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

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: image,
        });
        navigate(location?.state ? location.state : "/");
        toast.success({ content: "Registered successfully" });
      })
      .catch((error) => {
        toast.error({ content: error.message });
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success({ content: "Registered successfully" });
      })
      .catch((error) => {
        toast.error({ content: error.message });
      });
  };
  return (
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
  );
};

export default Register;
