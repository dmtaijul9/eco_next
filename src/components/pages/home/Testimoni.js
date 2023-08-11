import React, { useState } from "react";

// import react slick
import Slider from "react-slick";
import Image from "next/image";

const Testimoni = ({
  listTestimoni = [
    {
      image: "/image/banner-1.jpg",
    },
    {
      image: "/image/banner-2.jpg",
    },
    {
      image: "/image/banner-3.jpg",
    },
  ],
}) => {
  const settings = {
    dots: true,
    customPaging: function (i) {
      return (
        <a className="">
          <span className="block w-4 h-4 mx-2 transition-all rounded-l-full rounded-r-full cursor-pointer "></span>
        </a>
      );
    },
    dotsClass:
      "slick-dots w-max absolute mt-20 flex justify-center max-w-full bottom-4 left-4",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <div className="hidden md:block">
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex items-stretch justify-items-stretch "
      >
        {listTestimoni.map((testimoni, index) => (
          <div className="flex items-stretch " key={index}>
            <div className="flex flex-col  transition-all h-[500px]  rounded-sm">
              <Image
                src={testimoni.image}
                alt="testimoni"
                className="object-cover w-full h-full rounded-sm "
                width={700}
                height={500}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimoni;
