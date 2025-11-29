import React, { useEffect, useState } from "react";
import customerTop from "../../../assets/customer-top.png";

import ReviewCard from "./ReviewCard";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Review = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  if (!reviews)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );

  return (
    <div className="w-full mx-auto py-16">
      {/* ---------intro--------- */}
      <div className="text-center flex flex-col justify-center items-center gap-6 md:gap-10 px-4">
        <img
          src={customerTop}
          alt="customerTop"
          className="w-40 h-20 md:w-56 md:h-24"
        />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold secondary-text">
          What our customers are saying
        </h2>
        <p className="w-full md:w-2/3 lg:w-1/2 text-sm md:text-base text-gray-600 leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* -----------review slider----------- */}

      <div className="py-10 px-4">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          coverflowEffect={{
            rotate: 20,
            stretch: "60%",
            depth: 200,
            modifier: 1,
            scale: 0.9,
            slideShadows: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
