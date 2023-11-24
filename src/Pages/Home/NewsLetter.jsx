import CustomButton from "../../Components/Shared/CustomButton";
import useToast from "../../Components/Shared/useToast";
const NewsLetter = () => {
  const toast = useToast();
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success({ content: "Thank you for subscribing to our newsletter." });
  };
  return (
    <div className="my-16">
      <div className="flex flex-col md:flex-row justify-center gap-10">
        <div className="md:w-1/2">
          <img src="/newsletter.png" alt="" />
        </div>
        <div className="md:w-1/2 my-auto">
          <h1 className="text-2xl font-bold mb-5 lg:mt-5">
            DISCOVERING HEALTHIER COMMUNITIES MADE SIMPLE WITH{" "}
            <span className="text-rose">MEDICALCARE</span>
          </h1>
          <p>
            Subscribe to our updates for the latest insights, success stories,
            and exclusive features. Begin your mission to create healthier
            communities with us.
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center mt-12">
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="input input-bordered input-success w-full max-w-xs "
            />
            <CustomButton
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="btn bg-rose text-white hover:bg-rose"
            >
              Subscribe
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
