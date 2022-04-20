import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPage, onPageChange }: PaginationProps) => {
  const PaginationButton = ({ pageNumber }: { pageNumber: number }) => {
    const isCurrentPage = pageNumber === page;
    return (
      <button
        disabled={isCurrentPage}
        onClick={() => {
          onPageChange(pageNumber);
        }}
        className={classNames(styles.pagination_button, {
          [styles.active_pagination_button]: isCurrentPage,
        })}
      >
        <span
          className={classNames(styles.pagination_text, {
            [styles.active_pagination_text]: isCurrentPage,
          })}
        >
          {pageNumber}
        </span>
      </button>
    );
  };

  const PaginationMore = () => {
    return (
      <li className="flex items-end">
        <span className="text-primary-gray">...</span>
      </li>
    );
  };

  const displayPageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = page - 2; i <= page + 2; i++) {
      if (i > 1 && i < totalPage) pages.push(i);
    }
    return pages;
  }, [page, totalPage]);

  return (
    <ul className="flex">
      <li>
        <PaginationButton pageNumber={1} />
      </li>
      {page > 4 && <PaginationMore />}
      {displayPageNumbers.map((pageNumber, index) => (
        <li key={index}>
          <PaginationButton pageNumber={pageNumber} />
        </li>
      ))}
      {totalPage - 3 > page && <PaginationMore />}
      {totalPage > 1 && (
        <li>
          <PaginationButton pageNumber={totalPage} />
        </li>
      )}
    </ul>
  );
};

export { Pagination };
