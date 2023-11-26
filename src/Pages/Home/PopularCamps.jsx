import { useState } from "react";
import CampCard from "../../Components/Shared/CampCard";
import Heading from "../../Components/Shared/Heading";
import Loading from "../../Components/Shared/Loading";
import useAuth from "../../Hooks/useAuth";
import CustomButton from "../../Components/Shared/CustomButton";
import { Link } from "react-router-dom";

const PopularCamps = () => {
  const { camps, isLoading } = useAuth();
  const [sortBy, setSortBy] = useState("none");
  // const displayCamp = camps.slice(0,6)
  let results = [];
  if (camps) {
    if (sortBy === "mostRegistered") {
      results = camps.sort((a, b) => b.participants - a.participants);
    } else if (sortBy === "leastRegistered") {
      results = camps.sort((a, b) => a.participants - b.participants);
    } else {
      results = camps;
    }
  }
  const displayCamp = results.slice(0, 6);
  return (
    <div>
      <div className="my-12">
        <Heading main={"Popular"} sub={"Camps"}></Heading>
      </div>
      <div>
        <div className="flex justify-center md:justify-end my-12">
          <div className="md:w-96 ml-4">
            <label className="input-group flex">
              <select
                name="sort"
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="none">Sort by...</option>
                <option value="mostRegistered">Most Registered</option>
                <option value="leastRegistered">Least Registered</option>
              </select>
            </label>
          </div>
        </div>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayCamp?.map((camp) => (
              <CampCard key={camp._id} camp={camp}></CampCard>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center my-12">
        <Link to={"/camps"}><CustomButton>Show All</CustomButton></Link>
      </div>
    </div>
  );
};

export default PopularCamps;
