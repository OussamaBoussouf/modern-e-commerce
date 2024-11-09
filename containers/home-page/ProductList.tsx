import Card from "@/components/Card";
import { products } from "@/db/products";

async function getProducts() {
    await new Promise<void>((resolve) => {
        setTimeout(()=> {
            resolve();
        }, 2000)
    })

    return products;
}

async function ProductList() {

 const data = await getProducts();

  return (
    <>
      {data.map((product) => (
        <Card
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          rate={product.rate}
        />
      ))}
    </>
  );
}

export default ProductList;
