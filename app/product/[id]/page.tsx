import ProductImages from "@/components/ProductImages";
import QuantityManager from "@/components/QuantityManager";
import Rating from "@/components/Rating";
import prisma from "@/lib/db";

const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      subImages: true,
    },
  });

  return product;
};

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <p>No Product Found</p>;
  }

  return (
    <section className="container mx-auto py-10 px-3 ">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:max-w-[500px]">
          <ProductImages
            image={product?.image}
            subImages={product?.subImages}
          />
        </div>
        {/* PRODUCT? INFO */}
        <div className="w-full md:flex-grow">
          <div className="border-b-[1px] space-y-4 pb-3">
            <h2 className="text-3xl font-bold">{product?.name}</h2>
            <p className="text-sm text-gray-500">{product?.description}</p>
            <div className="inline-flex gap-2">
              <Rating reviewsLength={product.rating}/>
              <span>({product.rating})</span>
            </div>
          </div>
          <div className="border-b-[1px] py-5">
            <span className="text-3xl font-bold">${product?.price}</span>
          </div>
          <div className="py-3 border-b-[1px]">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-500 text-sm">
              Experience superior sound quality with our premium headphones.
              Designed for comfort and durability, these headphones deliver deep
              bass, crisp highs, and immersive audio. Whether you're listening
              to music, gaming, or taking calls, enjoy crystal-clear sound with
              noise isolation and wireless convenience. Elevate your audio
              experience today!
            </p>
          </div>
          <div>
            <QuantityManager product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
