import Card from "@/components/Card";
import { getSomeProducts } from "@/lib/actions/products/get-some-products";
import { Product } from "@/lib/types";

async function ProductList() {
  const products = await getSomeProducts(12);
  return (
    <>
      {products?.map((product: Omit<Product, "subImages">) => (
        <Card key={product.id} props={product} />
      ))}
    </>
  );
}

export default ProductList;
