"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/store/useCart";
import { pick } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

function SingleProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>();

  const { toast } = useToast();
  const { addToBasket } = useCart();

  const handleAddToBasket = (product: Product) => {
    const newProductShape = pick(
      { ...product, quantity },
      "name",
      "image",
      "price",
      "stock",
      "quantity",
      "id"
    );
    addToBasket(product.id, newProductShape, toast);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/product/${params.id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container mx-auto py-10 px-3 ">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:max-w-[500px]">
          <Image
            src={selectedImage || product?.image}
            width="400"
            height="400"
            alt="headphone"
            className="bg-gray-100 rounded-lg w-full h-auto"
          />
          <div className="flex items-center gap-[1.4%] w-full mt-2">
            <Image
              src={product?.image}
              alt="headphone"
              width="200"
              height="200"
              className={`w-[24%] cursor-pointer h-auto bg-gray-100 rounded-lg ${
                product?.image === selectedImage ? "border border-gray-500" : ""
              }`}
              onClick={() => setSelectedImage(product?.image)}
            />
            {product?.subImages?.map((headphone) => (
              <Image
                key={headphone.id}
                src={headphone.image}
                alt="headphone"
                width="200"
                height="200"
                className={`w-[24%] cursor-pointer h-auto bg-gray-100 rounded-lg ${
                  headphone.image === selectedImage
                    ? "border border-gray-500"
                    : ""
                }`}
                onClick={() => setSelectedImage(headphone.image)}
              />
            ))}
          </div>
        </div>
        {/* PRODUCT? INFO */}
        <div className="w-full md:flex-grow">
          <div className="border-b-[1px] space-y-4 pb-3">
            <h2 className="text-3xl font-bold">{product?.name}</h2>
            <p className="text-sm text-gray-500">{product?.description}</p>
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
              <span>({product?.rating})</span>
            </div>
          </div>
          <div className="border-b-[1px] py-5">
            <span className="text-3xl font-bold">${product?.price}</span>
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
                {quantity}
              </span>
              <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
            </div>
            <span>
              Only{" "}
              <span className="text-orange-400">{product?.stock} Items</span>{" "}
              Left! Dont miss it
            </span>
          </div>
          <div className="flex items-center gap-5 mt-3 h-12">
            <Button className="basis-1/2 h-full">Buy Now</Button>
            <Button
              variant="outline"
              className="basis-1/2 h-full"
              onClick={() => handleAddToBasket(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
