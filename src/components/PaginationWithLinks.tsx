    // components/ui/pagination-with-links.tsx
    import {
      Pagination,
      PaginationContent,
      PaginationItem,
      PaginationLink,
      PaginationNext,
      PaginationPrevious,
      PaginationEllipsis,
    } from "@/components/ui/pagination";

    interface PaginationWithLinksProps {
      currentPage: number;
      totalPages: number;
      basePath: string; // e.g., "/posts"
    }

    export function PaginationWithLinks({
      currentPage,
      totalPages,
      basePath,
    }: PaginationWithLinksProps) {
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`${basePath}?page=${Math.max(1, currentPage - 1)}`} />
            </PaginationItem>

            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href={`${basePath}?page=${page}`} isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    }