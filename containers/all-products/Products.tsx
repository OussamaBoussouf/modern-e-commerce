// "use client";

// import Card from "@/components/Card";
// import PaginationComponent from "@/components/Pagination";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const searchParams = useSearchParams();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     if (searchParams.size === 0) return products;

//     let filtered = [...products];

//     if (searchParams.has("category")) {
//       filtered = filtered.filter((product) =>
//         product.category.includes(searchParams.get("category"))
//       );
//     }

//     if (searchParams.has("price")) {
//       filtered = filtered.filter(
//         (product) => product.price <= Number(searchParams.get("price"))
//       );
//     }

//     if (searchParams.has("sort")) {
//       const sortDirection = searchParams.get("sort");
//       filtered = filtered.sort((a, b) =>
//         sortDirection === "asc" ? a.price - b.price : b.price - a.price
//       );
//     }

//     return filtered;
//   }, [searchParams, products]);

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
//       {filteredProducts.map((product) => (
//         <Card
//           key={product.id}
//           image={product.image}
//           name={product.name}
//           price={product.price}
//           rate={product.rating}
//         />
//       ))}
//     </div>
//   );
// }

// export default Products;
