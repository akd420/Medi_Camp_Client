/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import CustomButton from "./Shared/CustomButton";

const UpCard = ({ camp }) => {
  const {
    campName,
    fees,
    imageURL,
    location,
    services,
    targetAudience,
    time,
    description,
    _id,
  } = camp;
  const eventDate = new Date(time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedTime = eventDate.toLocaleDateString("en-US", options);
  let cat = targetAudience;
  if (targetAudience === "general") {
    cat = "General Health Checkup";
  } else if (targetAudience === "pediatric") {
    cat = "Pediatric Health Camp";
  } else if (targetAudience === "women") {
    cat = "Women's Health Camp";
  } else if (targetAudience === "senior") {
    cat = "Senior Citizens Health Camp";
  } else if (targetAudience === "dental") {
    cat = "Dental Health Camp";
  }
  return (
    <div>
      <div className="card card-compact bg-base-100 hover:shadow-xl transition">
        <Link to={`/upCamps/${_id}`}>
          <figure>
            <img
              className="rounded-t-lg md:h-96 w-full md:object-cover"
              src={imageURL}
              alt="Image not Found"
            />
          </figure>
        </Link>
        <div className="card-body flex flex-col">
          <Link to={`/upCamps/${_id}`}>
            <h2 className="card-title">{campName}</h2>

            <div>
              <p>
                <span className="font-medium">Time:</span> {formattedTime}
              </p>
              <p>
                <span className="font-medium">Location:</span> {location}
              </p>
              <p>
                <span className="font-medium">Services:</span> {services}
              </p>
              <p>
                <span className="font-medium">For:</span> {cat}
              </p>
              <p>
                <span className="font-medium">Fees:</span> ${fees}
              </p>

              <p>
                <span className="font-medium">Description:</span>{" "}
                {description.split(" ").slice(0, 25).join(" ")}...
              </p>
            </div>
          </Link>
          <div className="card-actions flex-grow">
            <Link to={`/upCamps/${_id}`}>
              <CustomButton>Details</CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpCard;
