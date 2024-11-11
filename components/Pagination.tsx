'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchQuery } from "@/hooks/useSearchQuery";

function PaginationComponent() {
  const {setQueryString} = useSearchQuery();
  return (
    <Pagination className="mt-10">
      <PaginationContent className="flex items-center justify-between w-full">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <div className="flex items-center">
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => setQueryString('page', '1')}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => setQueryString('page', '2')}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => setQueryString('page', '3')}>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </div>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
