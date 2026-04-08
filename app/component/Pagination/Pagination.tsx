"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 p-2">

      {/* Items per page */}
      <div className="flex items-center gap-2">
        <span className="text-xs">Items per page:</span>

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

      {/* Prev / Next */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded flex items-center gap-1 
          ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          <FaArrowLeft /> Prev
        </button>

        <span className="font-medium text-xs">
          {startItem}-{endItem} of {totalItems}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-3 py-1 rounded flex items-center gap-1 
          ${currentPage === totalPages || totalPages === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          Next <FaArrowRight />
        </button>

      </div>
    </div>
  );
};

export default Pagination;