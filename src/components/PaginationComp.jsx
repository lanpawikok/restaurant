import { Pagination } from "flowbite-react";

export default function PaginationComp({ currentPage, onPageChange, totalPages }) {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}