import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import amazon from "../../assets/brands/amazon.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import casio from "../../assets/brands/casio.png";
import star from "../../assets/brands/star.png";
import startPeople from "../../assets/brands/start_people.png";

import "swiper/css";

const Brands = () => {
  const brands = [amazon, moonstar, randstad, casio, star, startPeople];

  return (
    <div className="py-16 w-[90dvw] mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Trusted by Leading Brands
      </h2>

      <Swiper
        slidesPerView={2}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 60,
          },
        }}
        modules={[Autoplay]}
        className="brands-swiper"
      >
        {brands.concat(brands).map((brand, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="  hover:grayscale-0 transition-all duration-500   hover:opacity-100 transform hover:scale-110">
              <img
                src={brand}
                alt={`brand logo ${index}`}
                className="w-full h-auto max-h-14 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
