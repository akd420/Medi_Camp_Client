import useAuth from "../../Hooks/useAuth";
import CustomButton from "./CustomButton";

/* eslint-disable react/prop-types */
const CampCard = ({ camp, showJoin }) => {
    const {campName,fees,imageURL,location,participants,professionals, services,targetAudience,time, description} = camp;
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
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img
            src={imageURL}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{campName}</h2>
          <p><span className="font-medium">Time:</span> {formattedTime}</p>
          <p><span className="font-medium">Location:</span> {location}</p>
          <p><span className="font-medium">Services:</span> {services}</p>
          <p><span className="font-medium">Professionals in Attendance:</span> {professionals}</p>
          <p><span className="font-medium">For:</span> {cat}</p>
          <p><span className="font-medium">Fees:</span> ${fees}</p>
          <p><span className="font-medium">Participants:</span> {participants}</p>
          <p><span className="font-medium">Description:</span> {description.split(' ').slice(0, 25).join(' ')}...</p>
          <div className="card-actions">
            <CustomButton>Details</CustomButton>
            {
                showJoin && 
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
