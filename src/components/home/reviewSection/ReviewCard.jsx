import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }
    while (stars.length < 5) {
      stars.push(
        <FaStar key={`empty-${stars.length}`} className="text-gray-300" />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 max-w-md">
      <div className="mb-4">
        <FaQuoteLeft className="text-4xl text-cyan-200" />
      </div>

      <p className="text-gray-700 leading-relaxed mb-6 min-h-[80px] line-clamp-3">
        {review.review}
      </p>

      <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800 flex-shrink-0">
          <img
            src={review.user_photoURL}
            alt={review.userName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-lg text-gray-800">{review.userName}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-1">{renderStars(review.ratings)}</div>
            <span className="text-sm text-gray-600">({review.ratings})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
