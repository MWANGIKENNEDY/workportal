"use client";

import React from "react";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";

const Paginate = ({ pageCount }: { pageCount: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current page (default to 1)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = searchParams.get("limit") || "5";

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1; // react-paginate uses 0-based index
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("limit", limit);

    // Push new URL with updated query params
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={currentPage - 1} // sync UI (react-paginate is 0-indexed)
        containerClassName="flex space-x-2"
        pageClassName="px-3 py-1 border rounded cursor-pointer"
        activeClassName="bg-indigo-600 text-white cursor-pointer"
        previousClassName="px-3 py-1 border rounded cursor-pointer"
        nextClassName="px-3 py-1 border rounded cursor-pointer"
        breakClassName="px-3 py-1 cursor-pointer"
      />
    </div>
  );
};

export default Paginate;
