'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchQuery } from "@/hooks/useSearchQuery";

const SORT_BY = [
  {
    name: "Price(low to high)",
    value: "asc",
  },
  {
    name: "Price(high to low)",
    value: "desc",
  },
  {
    name: "Newest",
    value: "new",
  },
  {
    name: "Oldes",
    value: "old",
  },
];

function SortBy() {
  const {setQueryString} = useSearchQuery();

  const handleChange = (value:string) => {
    setQueryString("sort", value)
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent >
        {SORT_BY.map((sort) => (
          <SelectItem key={sort.name} value={sort.value}>
            {sort.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SortBy;
