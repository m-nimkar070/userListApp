import React from 'react';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="pagination w-full flex items-center justify-center p-1 my-3">
      <button className='p-2 mx-2 border rounded-md bg-slate-400'
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className='p-2 mx-2 border rounded-md bg-white'>{`${currentPage} / ${totalPages}`}</span>
      <button
      className='p-2 mx-2 border rounded-md bg-slate-400'
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
