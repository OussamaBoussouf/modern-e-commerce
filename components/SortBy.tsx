'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSearchParams } from "next/navigation";

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
  }
];

function SortBy() {
  const {setQueryString} = useSearchQuery();
  const searchParams = useSearchParams();
  const selectedSort = searchParams.get('sort') || undefined;

  return (
    <Select value={selectedSort}  onValueChange={(value: string) => setQueryString("sort", value)}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent >
        {SORT_BY.map((sort) => (
          <SelectItem  key={sort.name} value={sort.value}>
            {sort.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SortBy;
