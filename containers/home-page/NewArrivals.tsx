import Card from "@/components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import { Product } from "@/lib/types";

async function NewArrivals() {
  
  const res = await fetch("http://localhost:3000/api?collection=new-arrivals");
  if (!res.ok) throw new Error("Problem occured while fetching Products");
  const { products } = await res.json();

  return (
    <section className="container mx-auto py-10 px-3">
      <h2 className="text-2xl mb-5 font-bold">New Arrivals</h2>
      <div className="flex items-center justify-center">
        <Carousel className="w-full">
          <CarouselContent>
            {products.map((product: Omit<Product, "subImages">) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-center justify-center">
                <Card
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rate={product.rating}
                  id={product.id}
                  description={product.description}
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
