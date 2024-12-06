"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImagesProps = {
  image: string;
  subImages: { id: string; image: string; productId: string }[];
};

function ProductImages({ image, subImages }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>();
  return (
    <>
      <Image
        src={selectedImage || image}
        width="400"
        height="400"
        alt="headphone"
        className="bg-gray-100 rounded-lg w-full h-auto"
      />
      <div className="flex items-center gap-[1.4%] w-full mt-2">
        <Image
          src={image}
          alt="headphone"
          width="200"
          height="200"
          className={`w-[24%] cursor-pointer h-auto bg-gray-100 rounded-lg ${
            image === selectedImage ? "border border-gray-500" : ""
          }`}
          onClick={() => setSelectedImage(image)}
        />
        {subImages?.map((headphone) => (
          <Image
            key={headphone.id}
            src={headphone.image}
            alt="headphone"
            width="200"
            height="200"
            className={`w-[24%] cursor-pointer h-auto bg-gray-100 rounded-lg ${
              headphone.image === selectedImage ? "border border-gray-500" : ""
            }`}
            onClick={() => setSelectedImage(headphone.image)}
          />
        ))}
      </div>
    </>
  );
}

export default ProductImages;
