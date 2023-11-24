import { DominoSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="max-w-screen-xl h-screen flex items-center justify-center mx-auto">
      <DominoSpinner size={250} color="#F13650" loading={true} />
    </div>
  );
};

export default Loading;
