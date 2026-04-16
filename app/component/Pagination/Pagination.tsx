"use client";
import React, { useState } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  defaultPerPage?: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  defaultPerPage = 25,
  onPageChange,
  onPerPageChange,
}) => {
  const [perPage, setPerPage] = useState(defaultPerPage);

  const totalPages = Math.ceil(totalItems / perPage);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setPerPage(value);
    if (onPerPageChange) onPerPageChange(value);
    onPageChange(1);
  };

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 p-2 pt-4">

    {/* LEFT: Records per page */}
    <div className="flex items-center gap-2">
      <span className="text-xs">Records per page</span>

      <select
        value={perPage}
        onChange={handlePerPageChange}
        className="border px-2 py-1 rounded text-xs"
      >
        {[25, 50, 75, 100].map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </div>

    {/* RIGHT: Pagination buttons */}
    <div className="flex items-center gap-2 ml-auto">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded flex items-center gap-1 text-xs 
        ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        <FaAnglesLeft />
        <FaAngleLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 rounded text-xs ${
            currentPage === page ? "bg-green-200 font-bold" : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`px-2 py-1 rounded flex items-center gap-1 text-xs 
        ${currentPage === totalPages || totalPages === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        <FaAngleRight />
        <FaAnglesRight />
      </button>
    </div>

    {/* Record count */}
    <div className="text-xs font-medium w-full sm:w-auto text-center sm:text-right">
      {startItem} - {endItem} of {totalItems} Records
    </div>

  </div>

  );
};

export default Pagination;
