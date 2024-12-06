

import ProductImages from "@/components/ProductImages";
import QuantityManager from "@/components/QuantityManager";
import prisma from "@/lib/db";

const getProductById = async (id : string) => {
  const product = await prisma.product.findUnique({
    where: { id
    },
    include: {
      subImages: true,
    },
  });

  return product
}

async function SingleProductPage({ params }: { params: { id: string } }) {

  const product = await getProductById(params.id);  

  if (!product) {
    return <p>No Product Found</p>;
  }

  return (
    <section className="container mx-auto py-10 px-3 ">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:max-w-[500px]">
          <ProductImages image={product?.image} subImages={product?.subImages}/>
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
          <div>
            <QuantityManager product={product}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
