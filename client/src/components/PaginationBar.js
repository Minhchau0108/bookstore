import React from 'react'
import ReactPaginate from 'react-paginate';

const PaginationBar = (props) => {
    return (
        <div className="d-flex justify-content-center">
            <ReactPaginate
                pageCount={props.totalPages}
                pageRangeDisplayed={0}
                marginPagesDisplayed={1}
                onPageChange={props.handlePageClick}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default PaginationBar
