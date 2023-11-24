import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = [
  {
    img: "/slider1.webp",
    text: <div className="text-center bg-red-200 md:w-96 p-2 md:p-10 bg-opacity-60 text-black rounded-3xl">
        <h1 className="text-2xl font-bold">🌐 Connecting for a Healthier Tomorrow</h1>
        <p className="font-semibold text-lg mt-5">Embark on a visual journey that encapsulates the connectivity, growth, and success stories that define our role in building a healthier tomorrow.</p>
    </div>,
  },
  {
    img: "/slider2.webp",
    text: <div className="text-center bg-red-200 md:w-96 p-2 md:p-10 bg-opacity-60 text-black rounded-3xl">
    <h1 className="text-2xl font-bold">🤝 Your Partner in Health</h1>
    <p className="font-semibold text-lg mt-5">Step into a world where organizers, volunteers, and medical professionals unite, powered by a system that simplifies and enhances the medical camp experience.</p>
</div>,
  },
  {
    img: "/slider3.webp",
    text: <div className="text-center bg-red-200 md:w-96 p-2 md:p-10 bg-opacity-60 text-black rounded-3xl">
    <h1 className="text-2xl font-bold">🌟 Championing Impactful Moments</h1>
    <p className="font-semibold text-lg mt-5">Celebrate the victories, both big and small, that make each medical camp a success story worth sharing.</p>
</div>,
  },
];

const Slider = () => {
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
          }, 2000);
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
      <div ref={sliderRef} className="keen-slider h-auto object-cover absolute opacity-75">
        {images.map((item, index) => (
          <div key={index} className="keen-slider__slide number-slide1 mx-auto relative">
            <div className="h-[300px] md:h-[500px] lg:h-[800px] relative">
              <img
                className="h-full w-full object-cover"
                src={item.img}
                alt=""
              />
              <div
              className="absolute bg-no-repeat bg-center top-0 left-0 right-0 bottom-0 flex items-center justify-center text-2xl font-bold opacity-100 transition-opacity duration-300">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;
