import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({pageCount, pageSelected, openPage = f=>f}) =>
    <div>   
        <div className = 'd-inline-flex'>      
            <ReactPaginate
                pageCount               = {pageCount}
                previousLabel           = {'Предыдущая'}
                nextLabel               = {'Следующая'}
                breakLabel              = {'...'}
                breakClassName          = {'page-item'}
                breakLinkClassName      = {'page-link'}
                marginPagesDisplayed    = {2}
                pageRangeDisplayed      = {2}
                containerClassName      = {'pagination'}
                pageClassName           = {'page-item'}
                pageLinkClassName       = {'page-link'}
                activeClassName         = {'page-item active'}
                previousClassName       = {'page-item'}
                nextClassName           = {'page-item'}
                previousLinkClassName   = {'page-link'}
                nextLinkClassName       = {'page-link'}
                disabledClassName       = {'page-item disabled'}
                onPageChange            = {openPage}
                initialPage             = {pageSelected}
                forcePage               = {pageSelected}
            />
        </div>
        <div className = 'd-inline-flex col-lg-2'>
            <input  
                    className = 'form-control'
                    type="number" 
                    min = '1'
                    size="6"
                    name="page"
                    onBlur = {({target}) => {
                        pageSelected = parseInt(target.value) - 1
                        if(pageSelected<=pageCount){
                            openPage({selected: pageSelected})
                        }
                        target.value = ''
                    }}
            />
        </div>
    </div>
export default Pagination