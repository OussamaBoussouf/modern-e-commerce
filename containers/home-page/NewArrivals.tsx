import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getNewArrivals } from "@/lib/actions/products/get-new-arrivals";
import { LoaderCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { Suspense } from "react";

async function NewArrivals() {
  return (
    <section className="container mx-auto py-10 px-3">
      <h2 className="text-2xl mb-5 font-bold">New Arrivals</h2>
      <div className="flex items-center justify-center">
        <Suspense
          fallback={
            <div className="h-48 grid place-content-center">
              <LoaderCircle className="animate-spin" />
            </div>
          }
        >
          <NewArrivalsCarousel />
        </Suspense>
      </div>
    </section>
  );
}

export default NewArrivals;

const NewArrivalsCarousel = async () => {
  const products = await getNewArrivals();

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {products.map((product: Omit<Product, "subImages">) => (
          <CarouselItem
            key={product.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-center justify-center"
          >
            <ProductCard props={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};
