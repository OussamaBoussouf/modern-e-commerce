'use client'
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import SearchPreview from "./SearchPreview";
import { useClickOutside } from "@/hooks/useClickOutside";

function SearchProduct() {
  const [searchValue, setSearchValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const debouncedSearch = useDebounce(searchValue);
  const previewer = useRef(null);

  useClickOutside(previewer, () => {
    setIsVisible(false);
  });

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [debouncedSearch]);

  return (
    <div ref={previewer} className="relative max-w-[700px] mx-auto">
      <input
        className="bg-slate-200 w-full text-sm rounded-full py-2 ps-4 pe-8"
        type="text"
        placeholder="Search Product"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
