"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

const CATEGORIES = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Wired headphones",
    value: "wired",
  },
  {
    name: "Wireless headphones",
    value: "wireless",
  },
  {
    name: "True wireless earbuds",
    value: "earbuds",
  },
];

function SideBarFilter() {
  const { setQueryString } = useSearchQuery();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "";
  const [price, setPrice] = useState(searchParams.get("price"));
  const debouncedPriceValue = useDebounce(price, 500);

  useEffect(() => {
    if (price) {
      setQueryString("price", price.toString());
    }
  }, [debouncedPriceValue]);

  return (
    <aside className="md:basis-1/3 lg:basis-1/5 mb-10 lg:mb-0">
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="category" className="space-y-4 mt-2">
              {CATEGORIES.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={category.value}
                    id={category.name}
                    checked={selectedCategory == category.value && true}
                    onClick={() => setQueryString("category", category.value)}
                  />
                  <Label htmlFor={category.name}>{category.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
          <AccordionContent className="my-1">
            <span className="block mb-2">$0 - ${price ?? 100}</span>
            <input
              className="w-full"
              type="range"
              min="0"
              max={100}
              step={5}
              value={price ?? 100}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default SideBarFilter;
