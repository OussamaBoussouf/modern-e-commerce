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
    <div className="flex flex-col gap-3">
      <div className="h-[70%] w-full bg-gray-100 rounded-lg grid place-content-center">
        <Image
          src={selectedImage || image}
          width="400"
          height="400"
          alt="headphone"
          // className="bg-gray-100 rounded-lg object-cover h-full"
        />
      </div>
      <div className="w-full flex items-center gap-[2.4%] h-[30%]">
        <Image
          src={image}
          alt="headphone"
          width="200"
          height="200"
          className={`w-[23.2%] cursor-pointer bg-gray-100 rounded-lg ${
            image === selectedImage ? "border border-zinc-200" : ""
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
            className={`w-[23.2%] cursor-pointer bg-gray-100 rounded-lg ${
              headphone.image === selectedImage ? "border border-zinc-200" : ""
            }`}
            onClick={() => setSelectedImage(headphone.image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
