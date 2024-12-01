import SearchProduct from "@/components/SearchProduct";
import { Button } from "@/components/ui/button";

import { Menu, UserRound} from "lucide-react";
import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { getCart } from "@/lib/cart-actions";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import { CartProduct } from "@/lib/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All products" },
];

async function Header() {
  const cart: CartProduct[] = await getCart();

  return (
    <header>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-3 gap-5">
          {/* LOGO PLUS NAV */}
          <div className="flex items-center gap-5">
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
                  <li key={index} className="text-sm">
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="hidden md:block flex-grow">
            <div className="relative max-w-[500px] mx-auto">
              <SearchProduct />
            </div>
          </div>
          <ul className="gap-5 hidden md:flex md:items-center">
            <li className="inline-flex items-center">
              <SignedOut>
                <SignInButton>
                  <UserRound className="cursor-pointer" />
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
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            // onClick={() => setIsOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </div>
      {/* MOBILE VERSION */}
      {/* <MobileNavigation isOpen={isOpen} handleClose={() => setIsOpen(false)} /> */}
    </header>
  );
}

export default Header;

// function MobileNavigation({
//   isOpen,
//   handleClose,
// }: {
//   isOpen: boolean;
//   handleClose: () => void;
// }) {
//   const [searchValue, setSearchValue] = useState("");
//   const { setQueryString } = useSearchQuery();
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <div
//       className={`bg-gray-200 h-vh w-full ${
//         isOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
//       } duration-700 transition-['transform'] ease-in-out inset-0 fixed z-50 p-2`}
//     >
//       <Button variant="outline" onClick={handleClose}>
//         <X />
//       </Button>
//       <ul className="my-5 space-y-5">
//         <li className="relative max-w-[700px] mx-auto">
//           <input
//             className=" w-full text-sm rounded-lg py-2 ps-4 pe-8"
//             type="text"
//             placeholder="Search Product"
//             name="search"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             onKeyUp={(e) => {
//               if (e.key === "Enter") {
//                 if (pathname !== "/products") {
//                   router.push(`/products?search=${searchValue}`);
//                 } else {
//                   setQueryString("search", searchValue);
//                 }
//                 handleClose();
//               }
//             }}
//           />
//           <Search
//             size="15"
//             color="black"
//             className="absolute right-3 top-1/2 -translate-y-1/2"
//           />
//         </li>
//         <li>
//           <Link href="/account" onClick={handleClose}>
//             Account
//           </Link>
//         </li>
//         <li>
//           <Link href="/cart" onClick={handleClose}>
//             Cart
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
