import Heading from "../../Components/Shared/Heading";

const Faq = () => {
  return (
    <div className="my-12">
      <div className="mb-12">
      <Heading main={"Common"} sub={"Queries"}></Heading>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <img src="/faq.jpg" alt="" />
        </div>
        <div>
        <h1 className="lg:pl-5 text-3xl mb-10">Asked <span className="text-rose font-semibold">Questions</span></h1>
          <div className="space-y-2">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
            How does the Medical Camp Management System benefit organizers?
            </div>
            <div className="collapse-content">
              <p>Our system streamlines the entire process, from planning to execution. Organizers gain access to comprehensive tools for participant registration, resource allocation, and real-time monitoring, ensuring smooth and efficient medical camp management.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            Can volunteers easily integrate with the system?
            </div>
            <div className="collapse-content">
              <p>Absolutely! Our user-friendly interface allows volunteers to register, coordinate tasks, and communicate seamlessly. The system promotes collaboration, making it easy for volunteers to contribute their time and skills effectively.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            What features make this system stand out for healthcare professionals?
            </div>
            <div className="collapse-content">
              <p>Healthcare professionals benefit from advanced scheduling, patient data management, and real-time analytics. Our system enhances their ability to provide quality care by ensuring organized, data-driven, and efficient medical camp operations.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
            How secure is the data collected during medical camps?
            </div>
            <div className="collapse-content">
              <p>Data security is our top priority. We employ robust encryption protocols and adhere to industry best practices. All personal and medical information collected during the camps is treated with utmost confidentiality, ensuring privacy and compliance with data protection regulations.</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
