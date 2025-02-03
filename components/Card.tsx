import Image from "next/image";
import Link from "next/link";
import { summary } from "@/lib/utils";
import AddItemToCartButton from "./AddItemToCartButton";
import BuyNowButton from "./BuyNowButton";

type CardProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  stock: number;
};

function Card({ props }: { props: CardProps }) {
  return (
    <div className="max-w-[350px] bg-white p-3 shadow-xl rounded-lg">
      {/* IMAGE */}
      <div className="bg-slate-100">
        <Link href={`/product/${props.id}`}>
          <Image
            src={props.image}
            width="350"
            height="350"
            alt={props.name}
            className="w-[350px] h-auto rounded-lg"
          />
        </Link>
      </div>
      {/* CONTENT */}
      <div className="mt-2 flex flex-col gap-2">
        <p className="font-bold">{props.name}</p>
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
            <span>{props.rating}</span>
          </div>
          <span className="font-bold">${props.price}</span>
        </div>
        <p className="text-[.8rem] text-gray-500">
          {summary(props.description, 35)}
        </p>
      </div>
      {/* GROUP BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-2">
        <AddItemToCartButton
          productId={props.id}
          unitPrice={props.price}
          className="flex-grow"
        />
        <BuyNowButton
          image={props.image}
          name={props.name}
          stock={props.stock}
          id={props.id}
          price={props.price}
        />
      </div>
    </div>
  );
}

export default Card;
