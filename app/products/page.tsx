import SortBy from "@/components/SortBy";
import Products from "@/containers/all-products/Products";
import SideBarFilter from "@/containers/all-products/SideBarFilter";

function ProductsPage() {
  return (
    <>
      <section className="h-[400px] relative w-full bg-fixed bg-cover  bg-no-repeat bg-center bg-[url('../assets/images/headphone-product.jpg')]">
        <h2 className="absolute drop-shadow-2xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-9xl md:text-[12rem] tracking-wider text-white font-bold">
          Shop
        </h2>
      </section>
      <section className="container mx-auto py-10 px-3">
        <div className="border-b-[1px] pb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            Give All You Need
          </h2>
          <SortBy />
        </div>
        <div className="flex flex-col md:flex-row gap-x-8 py-10">
          <SideBarFilter />
          <Products />
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
