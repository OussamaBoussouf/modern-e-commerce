"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useSearchQuery } from "@/hooks/useSearchQuery";

const CATEGORIES = [
  "all",
  "wired headphones",
  "wireless headphones",
  "true wireless earbuds",
];

function SideBarFilter() {
  const [maxPrice, setMaxPrice] = useState("100");
  const {setQueryString} = useSearchQuery();

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
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={category}
                    id={category}
                    onClick={() => setQueryString("cateogry", category)}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
          <AccordionContent className="my-1">
            <span className="block mb-2">$0 - ${maxPrice}</span>
            <input
              className="w-full"
              type="range"
              min="0"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setQueryString("price", e.target.value);
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default SideBarFilter;
