import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { getToken, saveUser } from '../../api/auth'
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../Hooks/useAuth";
import useToast from "../Components/Shared/useToast";
import { useState } from "react";

const Login = () => {
  const { signInUser, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  console.log(loading);

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // try {
    //   //2. User Login
    //   //   const result = await signInUser(email, password)
    //   //5. get token
    //   //   await getToken(result?.user?.email)
    //   signInUser(email, password)
    //   toast.success({content: "Login Successful"});
    //   navigate(from, { replace: true });
    // } catch (err) {
    //   console.log(err);
    //   toast.error({content: err?.message});
    // }

    setLoading(true);
    signInUser(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success({content: "Login Successful"});
        setLoading(false);
      })
      .catch((error) => {
        toast.error({content: error.message});
        setLoading(false);
      });
  };

  // Handle Google signInUser
  const handleGoogleSignInUser = async () => {
    // try {
    //   //2. User Registration using google
    //   //   const result = await googleLogin();

    //   //4. save user data in database
    //   //   const dbResponse = await saveUser(result?.user);
    //   //   console.log(dbResponse);

    //   //5. get token
    //   //   await getToken(result?.user?.email);
    //   googleLogin().then(() => {
    //     navigate(from, { replace: true });
    //     toast.success({content: "Login Successful"});
    //   })
    // } catch (err) {
    //   console.log(err);
    //   toast.error({content: err?.message});
    // }
    setLoading(true);
    googleLogin()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success({content: "Login Successful"});
        setLoading(false);
      })
      .catch((error) => {
        toast.error({content: error.message});
        setLoading(false);
      });
  };
  return (
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
  );
};

export default Login;
