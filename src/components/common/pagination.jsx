import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const paginationWidth = 4;

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  let pages = _.range(1, pagesCount + 1);

  const prevPageClass = 'page-item ' + (currentPage === 1 ? 'disabled' : '');
  const nextPageClass = 'page-item ' + (currentPage === pagesCount ? 'disabled' : '');

  const doLargerPagination = pagesCount > paginationWidth * 2 + 2;
  if (doLargerPagination) pages = calculatePages(pagesCount, currentPage, pages);

  return (
    <nav>
      <ul className="pagination">
        <li className={prevPageClass}>
          <a className="page-link" aria-label="Previous" onClick={() => onPageChange(currentPage - 1)}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pages.map(page => (
          <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className={nextPageClass}>
          <a className="page-link" aria-label="Next" onClick={() => onPageChange(currentPage + 1)}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

function calculatePages(pagesCount, currentPage, pages) {
  const currentPos = currentPage - 1;
  let min = currentPos - paginationWidth,
    max = currentPos + paginationWidth + 1;

  if (min < 0) {
    max -= min;
    min = 0;
  } else if (max > pagesCount) {
    min -= max;
    max = pagesCount;
  }
  return pages.slice(min, max);
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
