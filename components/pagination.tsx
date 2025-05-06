import React, { useState } from "react";

interface PaginationProps {
	totalCount: number;
	pageSize: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({ totalCount, pageSize, onPageChange }: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(totalCount / pageSize);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		onPageChange(page);
	};

	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 4) {
				pages.push(1, 2, 3, 4, 5, "...", totalPages);
			} else if (currentPage >= totalPages - 3) {
				pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
			}
		}
		return pages;
	};

	return (
		<div className="flex justify-center mt-4">
			<div className="join">
				<button
					className="join-item btn"
					onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
					disabled={currentPage === 1}
				>
					«
				</button>

				{getPageNumbers().map((page, idx) =>
					page === "..." ? (
						<button key={`dots-${idx}`} className="join-item btn btn-disabled">
							...
						</button>
					) : (
						<button
							key={`page-${page}`}
							className={`join-item btn ${
								currentPage === page ? "btn-active text-white bg-blue-500 border-blue-500" : ""
							}`}
							onClick={() => handlePageChange(page as number)}
						>
							{page}
						</button>
					)
				)}

				<button
					className="join-item btn"
					onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
					disabled={currentPage === totalPages}
				>
					»
				</button>
			</div>
		</div>
	);
};

export default Pagination;
