import { MagicSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="max-w-screen-xl h-screen flex items-center justify-center mx-auto">
      <MagicSpinner size={250} color="#59815B" loading={true} />
    </div>
  );
};

export default Loading;
