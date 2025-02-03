'use client'
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import SearchPreview from "./SearchPreview";

function SearchProduct() {
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const debouncedSearch = useDebounce(searchValue);
  const previewer = useRef(null);

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [debouncedSearch]);

  return (
    <div ref={previewer} className="relative">
      <input
        className="bg-slate-200 w-full text-sm rounded-md py-2 ps-4 pe-8"
        type="text"
        placeholder="Search Product"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onBlur={() => setIsVisible(false)}
      />
      <Search
        size="15"
        color="black"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      />
      <SearchPreview
        searchedValue={debouncedSearch}
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
      />
    </div>
  );
}

export default memo(SearchProduct);
