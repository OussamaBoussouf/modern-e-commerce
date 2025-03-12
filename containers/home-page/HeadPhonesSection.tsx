import { Suspense } from "react";
import ProductList from "./ProductList";
import LoadingProduct from "../../components/LoadingProduct";

function HeadPhonesSection() {
  return (
    <section className="container mx-auto py-10 px-3 border-b-[1px]">
      <h2 className="text-2xl mb-5 font-bold">Headphones For You!</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <Suspense fallback={[...Array(12)].map((_, index) =><LoadingProduct key={index}/>)}>
          <ProductList />
        </Suspense>
      </div>
    </section>
  );
}

export default HeadPhonesSection;
