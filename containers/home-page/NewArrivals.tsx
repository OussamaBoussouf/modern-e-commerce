import Card from "@/components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { newProducts } from "@/db/products";

function NewArrivals() {
  return (
    <section className="container mx-auto py-10 px-3">
      <h2 className="text-2xl mb-5 font-bold">New Arrivals</h2>
      <div className="flex items-center justify-center">
        <Carousel className="w-full">
          <CarouselContent>
            {newProducts.map((product) => (
              <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-center justify-center">
                <Card
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rate={product.rate}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
}

export default NewArrivals;
