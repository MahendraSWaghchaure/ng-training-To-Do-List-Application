import React from 'react';
import '../Styling/Pagination.css';

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      
      {/* Previous Button */}
      <button
        className="slds-button slds-button_neutral"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}  // Disable button on first page
        style={{ marginRight: '10px' }}
      >
        Previous
      </button>

      {/* Display current page */}
      <span style={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>

      {/* Next Button */}
      <button
        className="slds-button slds-button_neutral"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}  // Disable button on last page
        style={{ marginLeft: '10px' }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
