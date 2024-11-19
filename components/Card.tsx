import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { summary } from "@/lib/utils";

type CardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  rate: number;
  description: string;
};

function Card({ image, name, description, price, rate, id }: CardProps) {
  return (
    <div className="max-w-[350px]">
      {/* IMAGE */}
      <div className="bg-gray-200 rounded-lg">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            width="350"
            height="350"
            alt={name}
            className="w-[350px] h-auto rounded-lg"
          />
        </Link>
      </div>
      {/* CONTENT */}
      <div className="mt-2 flex flex-col gap-2">
        <p className="font-bold">{name}</p>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1">
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
            <span>{rate}</span>
          </div>
          <span className="font-bold">${price}</span>
        </div>
        <p className="text-[.8rem] text-gray-500">{summary(description, 35)}</p>
      </div>
      {/* GROUP BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-2">
        <Button variant="outline" className="flex-grow">
          Add to Cart
        </Button>
        <Button className="flex-grow">Buy Now</Button>
      </div>
    </div>
  );
}

export default Card;
