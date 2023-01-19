import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import '../components/css/Paginated.css';

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



const PaginatedItems = ({ itemsPerPage, pageable }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = items.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(items.length / itemsPerPage);
    const pageCount = itemsPerPage

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        pageable(event.selected)
        console.log(event.selected);
        // setItemOffset(newOffset);

    };

    return (
        <>

            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </>
    );
}
export default PaginatedItems;