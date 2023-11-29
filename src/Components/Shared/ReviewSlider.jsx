/* eslint-disable react/prop-types */
import { useKeenSlider } from "keen-slider/react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "keen-slider/keen-slider.min.css";

const ReviewSlider = ({ filteredCamps }) => {
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#F13650",
    inactiveFillColor: "#f472b6",
  };
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div
        ref={sliderRef}
        className="keen-slider h-auto object-cover opacity-75"
      >
        {filteredCamps?.map((camp, index) => (
          <div
            key={index}
            className="keen-slider__slide number-slide1 mx-auto "
          >
            {camp.reviewPhoto && (
              <div className="h-[300px] md:h-[500px] lg:h-[800px] ">
                <img
                  className="h-full w-full object-cover"
                  src={camp.reviewPhoto}
                  alt=""
                />
              </div>
            )}
            <div className="text-center bg-green-200  p-2 md:p-10 bg-opacity-60 rounded-3xl mt-2 mx-auto">
              <h1 className="text-2xl font-bold">{camp.name}</h1>
              <p className="font-semibold text-lg mt-2">
                {new Date(camp.time).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-bold text-lg mt-2">{camp.campName}</p>
              <p className="font-medium text-lg mt-2">{camp.review}</p>
              <div className="flex mt-3  justify-center">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={camp.rating}
                  itemStyles={myStyles}
                ></Rating>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewSlider;
