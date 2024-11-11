"use client";

import Image from "next/image";
import headphone from "../../../assets/images/black-headphone-1.png";
import headphone1 from "../../../assets/images/airpods.png";
import headphone2 from "../../../assets/images/blue-headphone.png";
import headphone3 from "../../../assets/images/black-headphone.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SUBHEADPHONES = [headphone, headphone1, headphone2, headphone3];

function SingleProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(SUBHEADPHONES[0]);

  return (
    <section className="container mx-auto py-10 px-3 ">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2">
          <Image
            src={selectedImage}
            width="500"
            height="500"
            alt="headphone"
            className="h-auto w-full bg-gray-100 rounded-lg"
          />
          <div className="flex items-center gap-[1.4%] w-full mt-5">
            {SUBHEADPHONES.map((headphone, index) => (
              <Image
                key={index}
                src={headphone}
                alt="headphone"
                width="200"
                height="200"
                className="w-[24%] cursor-pointer h-auto bg-gray-100 rounded-lg"
                onClick={() => setSelectedImage(headphone)}
              />
            ))}
          </div>
        </div>
        {/* PRODUCT INFO */}
        <div className="md:w-1/2">
          <div className="border-b-[1px] space-y-4 pb-3">
            <h2 className="text-3xl font-bold">Airpods - Max</h2>
            <p className="text-sm text-gray-500">
              a perfect balance of exhilarating high-fidelity audio and the
              effortless magic of AirPods
            </p>
            <div className="inline-flex gap-2">
              <svg
                fill="orange"
                viewBox="-2 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                className="jam jam-star-full"
                stroke="orange"
                height="20"
                width="20"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M10 16.207l-6.173 3.246 1.179-6.874L.01 7.71l6.902-1.003L10 .453l3.087 6.254 6.902 1.003-4.995 4.869 1.18 6.874z"></path>
                </g>
              </svg>
              <span>(4.5)</span>
            </div>
          </div>
          <div className="border-b-[1px] py-5">
            <span className="text-3xl font-bold">$540.00</span>
          </div>
          <div className="py-3 border-b-[1px]">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              iusto in quasi! Maiores at quasi impedit accusamus a laboriosam,
              ratione facilis rem ipsum alias, id atque veritatis odio neque
              pariatur!
            </p>
          </div>
          <div className="py-5">
            <div className="flex items-center gap-5 bg-gray-100 rounded-md p-1 w-fit mb-4">
              <Button
                onClick={() => setQuantity((prev) => prev - 1)}
                disabled={quantity === 1}
              >
                -
              </Button>
              <span className="w-2 flex items-center justify-center">
                {" "}
                {quantity}
              </span>
              <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
            </div>
            <span>
              Only <span className="text-orange-400">12 Items</span> Left! Dont
              miss it
            </span>
          </div>
          <div className="flex items-center gap-5 mt-3 h-12">
            <Button className="basis-1/2 h-full">Buy Now</Button>
            <Button variant="outline" className="basis-1/2 h-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
