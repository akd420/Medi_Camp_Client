import Loader from "../../../Components/Shared/Loader";
import useAuth from "../../../Hooks/useAuth";

const RegisteredCamps = () => {
  const { user,camps } = useAuth();
  const { isLoading, refetch, data } = Loader(
    `registeredCamps?email=${user?.email}`,
    "registeredCampsByEmail"
  );
  const campIds = data?.map((camp) => camp?.campId);
  const filteredCamps = camps?.filter((camp) => campIds?.includes(camp._id));
  console.log(filteredCamps);
  return (
    <div>
      <p>Hi, I am RegisteredCamps {data?.length}</p>
    </div>
  );
};

export default RegisteredCamps;
