import Card from "@/components/Card";
import { Product } from "@/lib/types";


async function ProductList() {
  const res = await fetch("http://localhost:3000/api?collection=random-products");
  if(!res.ok) throw new Error('Problem occured while fetching Products');
  const {products} = await res.json();


  return (
    <>
      {products?.map((product : Omit<Product, 'subImages'>) => (
        <Card
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          rate={product.rating}
          description={product.description}
          id={product.id}
        />
      ))}
    </>
  );
}

export default ProductList;
