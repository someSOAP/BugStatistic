import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({pageCount, pageSelected, openPage = f=>f}) =>
    <div className = 'pageSelect'>
        <ReactPaginate
            pageCount={pageCount}
            previousLabel={'Предыдущая'}
            nextLabel={'Следующая'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            containerClassName={'pagination'}
            subContainerClassName={'pagesPagination'}
            activeClassName={'activePage'}
            onPageChange = {openPage}
            initialPage = {pageSelected}
            forcePage = {pageSelected}
        />
        <input  type="number" 
                defaultValue = {pageSelected+1}
                size="3"
                name="page"
                onBlur = {({target}) => {
                    pageSelected = parseInt(target.value)
                    if(pageSelected<=pageCount){
                        openPage({selected: pageSelected})
                        target.value = ''
                    }
                }}
        />
    </div>
export default Pagination