/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import CampCard from "../../Components/Shared/CampCard";
import CustomContainer from "../../Components/Shared/CustomContainer";
import Heading from "../../Components/Shared/Heading";
import Loading from "../../Components/Shared/Loading";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AvailableCamps = () => {
  const { camps, isLoading } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    if (camps) {
      let results = camps?.filter((camp) => {
        if (selectedCategory === "all") {
          return (
            camp.campName.toLowerCase().includes(searchValue.toLowerCase()) ||
            camp.fees.toString().includes(searchValue) ||
            camp.description
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            camp.services.toLowerCase().includes(searchValue.toLowerCase()) ||
            camp.professionals
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            camp.location.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        const categoryMatch = camp.targetAudience
          ? camp.targetAudience
              .toLowerCase()
              .includes(selectedCategory.toLowerCase())
          : false;
        const searchMatch =
          camp.campName.toLowerCase().includes(searchValue.toLowerCase()) ||
          camp.fees.toString().includes(searchValue) ||
          camp.description.toLowerCase().includes(searchValue.toLowerCase()) ||
          camp.services.toLowerCase().includes(searchValue.toLowerCase()) ||
          camp.professionals
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          camp.location.toLowerCase().includes(searchValue.toLowerCase());
        return categoryMatch && searchMatch;
      });

      if (sortBy === "mostRegistered") {
        results = results.sort((a, b) => b.participants - a.participants);
      } else if (sortBy === "leastRegistered") {
        results = results.sort((a, b) => a.participants - b.participants);
      } else if (sortBy === "aToZ") {
        results = results.sort((a, b) =>
          a.campName.localeCompare(b.campName, undefined, {
            sensitivity: "base",
          })
        );
      } else if (sortBy === "zToA") {
        results = results.sort((a, b) =>
          b.campName.localeCompare(a.campName, undefined, {
            sensitivity: "base",
          })
        );
      } else if (sortBy === "highPriced") {
        results = results.sort((a, b) => a.fees - b.fees);
      } else if (sortBy === "lowPriced") {
        results = results.sort((a, b) => b.fees - a.fees);
      }

      setFilteredCards(results);
    }
  }, [camps, searchValue, selectedCategory, sortBy]);

  return (
    <div>
      <Helmet>
        <title>Medicamp | Available Camps</title>
      </Helmet>
      <CustomContainer>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div>
            <div className="my-12">
              <Heading main={"Available"} sub={"Camps"}></Heading>
            </div>
            <div className="join flex mt-12 justify-center">
              <input
                className="input input-bordered input-error join-item md:w-4/12"
                placeholder="Search...."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="btn join-item btn-square w-20 bg-rose text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-center md:justify-between my-12">
              <div className="md:w-96">
                <label className="input-group flex">
                  <select
                    name="category"
                    className="select select-bordered w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="general">General Health Checkup</option>
                    <option value="pediatric">Pediatric Health Camp</option>
                    <option value="women">Women's Health Camp</option>
                    <option value="senior">Senior Citizens Health Camp</option>
                    <option value="dental">Dental Health Camp</option>
                  </select>
                </label>
              </div>
              <div className="md:w-96 ml-4">
                <label className="input-group flex">
                  <select
                    name="sort"
                    className="select select-bordered w-full"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="none">Default</option>
                    <option value="mostRegistered">Most Registered</option>
                    <option value="leastRegistered">Least Registered</option>
                    <option value="aToZ">A &gt; Z</option>
                    <option value="zToA">Z &gt; A</option>
                    <option value="lowPriced">Fees ( High &gt; Low)</option>
                    <option value="highPriced">Fees ( Low &gt; High)</option>
                  </select>
                </label>
              </div>
            </div>
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCards.map((camp) => (
                  <CampCard
                    key={camp._id}
                    camp={camp}
                    showJoin={true}
                  ></CampCard>
                ))}
              </div>
            ) : (
              <div className=" max-w-screen-xl w-screen mx-auto">
                <h1 className="text-center font-bold text-5xl">
                  No match Found!!!
                </h1>
              </div>
            )}
          </div>
        )}
      </CustomContainer>
    </div>
  );
};

export default AvailableCamps;
