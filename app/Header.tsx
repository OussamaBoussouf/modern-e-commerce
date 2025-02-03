import SearchProduct from "@/components/SearchProduct";
import { Button } from "@/components/ui/button";

import { Menu, UserRound } from "lucide-react";
import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import { CartProduct } from "@/lib/types";
import { getProductsInCart } from "@/lib/actions/cart/get-products-in-cart";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All products" },
];

async function Header() {
  const cart: CartProduct[] = await getProductsInCart();

  return (
    <header className="my-2">
      <div className="container mx-auto">
        <div className="grid grid-cols-[auto_minmax(1fr, 500px)_auto] grid-rows-2 gap-2 md:grid-rows-1 px-3">
          {/* LOGO PLUS NAV */}
          <div className="flex items-center gap-5 col-span-2 md:col-span-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Lucide Store logo"
              viewBox="0 0 35 35"
              height="30"
              width="30"
              className="fill-black dark:fill-white h-[30px] w-[30px]"
            >
              <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
              <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
            </svg>
            <nav>
              <ul className="flex items-center gap-5">
                {links.map((link, index) => (
                  <li key={index} className="text-sm text-slate-400 hover:text-black">
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* SEARCH BAR */}
          <div className="row-start-2 col-span-3 md:row-start-1 md:col-start-2 md:col-span-1">
            <SearchProduct />
          </div>
          {/* USER & BASKET BUTTON */}
          <ul className="col-start-3 justify-self-end gap-3 flex items-center ">
            <li className="inline-flex items-center">
              <SignedOut>
                <SignInButton>
                  <UserRound className="cursor-pointer" size="20" />
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
            <li className="relative">
              <ShoppingCartButton cart={cart} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;

