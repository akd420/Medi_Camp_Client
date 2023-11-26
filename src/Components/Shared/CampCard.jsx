import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import CustomButton from "./CustomButton";

/* eslint-disable react/prop-types */
const CampCard = ({ camp, showJoin }) => {
    const {user} =useAuth();
    const {campName,fees,imageURL,location,participants,professionals, services,targetAudience,time, description,_id} = camp;
    const {userData}=useAuth();
    let role = null;
    if(userData){
      role = userData?.role;
    }
    const eventDate = new Date(time);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const formattedTime = eventDate.toLocaleDateString('en-US', options);
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
      <div className="card card-compact bg-base-100">
       <Link to={`/camps/${_id}`}>
       <figure>
          <img
            className="rounded-t-lg md:h-96 w-full md:object-cover"
            src={imageURL}
            alt="Shoes"
          />
        </figure>
       </Link>
        <div className="card-body flex flex-col">
          <Link to={`/camps/${_id}`}>
          <h2 className="card-title">{campName}</h2>
          <p><span className="font-medium">Time:</span> {formattedTime}</p>
          <p><span className="font-medium">Location:</span> {location}</p>
          <p><span className="font-medium">Services:</span> {services}</p>
          <p><span className="font-medium">Professionals in Attendance:</span> {professionals}</p>
          <p><span className="font-medium">For:</span> {cat}</p>
          <p><span className="font-medium">Fees:</span> ${fees}</p>
          <p><span className="font-medium">Participants:</span> {participants}</p>
          <p><span className="font-medium">Description:</span> {description.split(' ').slice(0, 25).join(' ')}...</p></Link>
          <div className="card-actions flex-grow">
            <Link to={`/camps/${_id}`}><CustomButton>Details</CustomButton></Link>
            {
               user && showJoin && 
                    role === "participant" ? (
                        <CustomButton>Join</CustomButton>
                    ) : (
                        ""
                    )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
