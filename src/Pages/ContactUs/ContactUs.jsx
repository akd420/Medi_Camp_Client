/* eslint-disable react/no-unescaped-entities */
import { Helmet } from "react-helmet-async";
import CustomButton from "../../Components/Shared/CustomButton";
import CustomContainer from "../../Components/Shared/CustomContainer";
import useToast from "../../Components/Shared/useToast";
import Map from "./Map";

const ContactUs = () => {
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success({ content: "Thank you for reaching out!!" });
  };
  return (
    <div>
      <Helmet>
        <title>Medicamp | Contact Us</title>
      </Helmet>
      <div className="relative overflow-hidden">
        <img
          src="/contactus.jpg"
          alt=""
          className="opacity-60 md:h-auto h-[200px]"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl md:text-6xl text-rose font-semibold">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-rose font-semibold mt-4">
            We are here to help you
          </p>
        </div>
      </div>
      <div>
        <section className="bg-white">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <p className="mb-8 lg:mb-16 text-center text-rose text-2xl">
              Get In Touch With Us.
            </p>
            <form onSubmit={handleSubmit} action="#" className="space-y-8">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  placeholder="Enter Your Email Here"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 "
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Leave a comment..."
                  required
                ></textarea>
              </div>
              <div type="submit">
                <CustomButton>Send message</CustomButton>
              </div>
            </form>
          </div>
        </section>
      </div>
      <CustomContainer>
        <div>
          <h2 className="text-center text-3xl text-rose mb-5">Our Location</h2>
          <p className="text-center text-xl text-rose mb-5">
            The Queen's Walk, Bishop's, London SE1 7PB,
            <br /> United Kingdom.
          </p>
          <Map
            position={[51.50355492774545, -0.11936052883487921]}
            popUp={"MediCamp"}
          ></Map>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ContactUs;
