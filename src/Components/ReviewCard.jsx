/* eslint-disable react/prop-types */
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const ReviewCard = ({ camp }) => {
  const eventDate = new Date(camp?.time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedTime = eventDate.toLocaleDateString("en-US", options);
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#F13650",
    inactiveFillColor: "#f472b6",
  };
  return (
    <div>
      <div className="card glass">
        {camp.reviewPhoto && (
          <figure>
            <img src={camp?.reviewPhoto} alt="Image Not Found" />
          </figure>
        )}
        <div className="card-body text-center">
          <h2 className="text-xl font-semibold text-center">{camp.name}</h2>
          <p>{formattedTime}</p>
          <h2 className="text-xl font-semibold text-center">{camp.campName}</h2>
          <p>{camp.review}</p>
          <div className="mx-auto mt-5">
            <Rating
              style={{ maxWidth: 150 }}
              value={camp.rating}
              itemStyles={myStyles}
            ></Rating>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
