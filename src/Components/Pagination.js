import React from 'react';

function Pagination({ tasksPerPage, totalTasks, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="slds-button-group-list">
      {pageNumbers.map(number => (
        <li key={number}>
          <button
            className={`slds-button ${currentPage === number ? 'slds-button_brand' : 'slds-button_neutral'}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
