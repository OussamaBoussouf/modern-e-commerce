import { previewProducts } from "@/db/products";
import Image from "next/image";

function SearchPreview({ searchedValue, isVisible }: { searchedValue: string, isVisible: boolean }) {
    
  const filteredProducts = previewProducts.filter((previewProduct) =>
    previewProduct.name.toLowerCase().includes(searchedValue.toLowerCase())
  );



  return (
    <div
     
      className={`styled-scrollbar shadow-xl py-5 rounded-lg absolute ${
        isVisible
          ? "top-[100%] opacity-100 visible"
          : "top-[150%] opacity-0 invisible"
      } transition-all duration-800 w-full max-h-60 lg:max-h-96 overflow-auto`}
    >
      {filteredProducts.length !== 0 ? (
        <ul className="divide-y">
          {filteredProducts.map((previewProduct) => (
            <li
              key={previewProduct.id}
              className="py-2 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center justify-between  px-3 lg:px-6">
                <div className="inline-flex items-center w-60">
                  <Image
                    src={previewProduct.image}
                    width={60}
                    height={60}
                    alt={previewProduct.name}
                    className="w-auto h-auto"
                  />
                  <p className="ms-4 text-sm lg:text-base">
                    {previewProduct.name}
                  </p>
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      fill="green"
                      viewBox="-2 -2 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMinYMin"
                      className="jam jam-star-full"
                      stroke="green"
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
                  ))}{" "}
                  <span>(132)</span>
                </div>
                <span className="font-semibold text-sm lg:text-base">
                  ${previewProduct.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-3 text-sm">
          There are no products that match{" "}
          <span className="font-bold">"{searchedValue}"</span>
        </p>
      )}
    </div>
  );
}

export default SearchPreview;
