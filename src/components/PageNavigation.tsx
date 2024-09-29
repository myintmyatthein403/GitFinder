interface PageNavigationProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  pageInfo?: {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  totalCount: number;
  itemsPerPage: number;
  limit: number;
  currentPage: number;
  totalPages: number;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  handlePrevPage,
  handleNextPage,
  pageInfo,
  totalCount,
  itemsPerPage,
  currentPage,
  totalPages,
}) => {
  console.log(currentPage);
  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={!pageInfo?.hasPreviousPage}
          className="p-3 bg-gray-400 text-gray-800 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-500 disabled:opacity-50"
        >
          &laquo; Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!pageInfo?.hasNextPage}
          className="p-3 bg-gray-400 text-gray-800 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-500 disabled:opacity-50"
        >
          Next &raquo;
        </button>
      </div>
      {pageInfo && (
        <div className="text-gray-800 mt-2">
          Page {currentPage} of {totalPages} | Showing {itemsPerPage} items per
          page out of {totalCount} items
        </div>
      )}
    </div>
  );
};
