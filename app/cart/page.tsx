import Cart from "@/components/Cart";
import { getProductsInCart } from "@/lib/actions/cart/get-products-in-cart";


async function CartPage(){
  const productsInCart = await getProductsInCart();
  
  return (
    <section className="container mx-auto py-10 px-3 md:flex md:items-start md:justify-center gap-8">
      <Cart cart={productsInCart}/>
    </section>
  );
}

export default CartPage;
