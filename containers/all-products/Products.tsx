import Card from "@/components/Card";
import PaginationComponent from "@/components/Pagination";
import { products } from "@/db/products";

function Products() {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card
            image={product.image}
            name={product.name}
            price={product.price}
            rate={product.rate}
          />
        ))}
      </div>
      <PaginationComponent />
    </div>
  );
}

export default Products;
