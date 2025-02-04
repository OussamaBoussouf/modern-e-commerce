import { Star, StarHalf } from "lucide-react";
import React from "react";

function Rating({ reviewsLength }: { reviewsLength: number }) {
  const hasHalfStar = reviewsLength - Math.floor(reviewsLength) > 0;

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, () => (
          <Star fill="#111" />
        ))}
      </div>
      <div className="absolute top-0 left-0 flex items-center gap-1">
        {Array.from({ length: reviewsLength }, () => (
          <Star fill="orange" strokeWidth={0} />
        ))}
        {hasHalfStar && <StarHalf fill="orange" strokeWidth={0} />}
      </div>
    </div>
  );
}

export default Rating;
