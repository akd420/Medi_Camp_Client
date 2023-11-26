import useAuth from "../../../../Hooks/useAuth";

/* eslint-disable react/prop-types */
const CampDetailsCard = ({camp}) => {
    const {userData}=useAuth();
    let role = null;
    if(userData){
      role = userData?.role;
    }
    const {campName,fees,imageURL,location,participants,professionals, services,targetAudience,time, description,_id} = camp;
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
            <p>Hi, I am CampDetailsCard of {camp.campName}</p>
        </div>
    );
};

export default CampDetailsCard;