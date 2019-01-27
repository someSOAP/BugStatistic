import React            from 'react'
import Row              from './tablerow'
import * as TableF      from '../../functions/tablefunctions'
import { empty }        from '../../constants'
import Pagination       from '../pagination'
import $                from 'jquery'

const { valuesToArray, attrsToArray, formatStr, createFilterField } = TableF

function clearInputs(){
    const inputs    = [...$('thead input')]
    inputs.forEach((item) => item.value = '')
    $("thead select option").filter(function() {
        return $(this).text() == empty; 
    }).prop('selected', true);
}


class Table extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {headrows, rows, options, filters, dateValues, title, openPage, pageCount, pageSelected } = this.props
        const { clearFilters, filterData } = filters
        return(
            <div>
                <h2>{title}</h2>
                <table className='table table-striped table-reflow'>
                    <thead className = 'thead-dark'>
                        {
                            attrsToArray(headrows[0]).map((attr, i) => 
                                    <th>
                                        <label> {formatStr(attr)}  
                                            {createFilterField(attr, options, filters, dateValues, i)}
                                        </label>
                                    </th>
                            )
                        }
                    </thead>
                    {
                        (rows.length) ? 
                    <tbody>
                        {
                            rows.map(row => <Row args={valuesToArray(row)}/>)
                        }
                    </tbody> : 
                    <div>
                        <h1>Данные не найдены</h1>
                    </div>
                    }
                </table>
                <div class="btn-group float-left">
                    <Pagination 
                        openPage ={openPage}
                        pageCount = {pageCount}
                        pageSelected = {pageSelected}
                    />
                </div>
                <div class="btn-group float-right" role="group" aria-label="Basic example">
                    <button 
                        type="button"
                        class="btn btn-secondary"
                        onClick = {
                            () => {
                                clearFilters()
                                clearInputs()
                            }
                        }
                    > Сбросить фильтры 
                    </button>
                    <button 
                        type="button"
                        class="btn btn-secondary"
                        onClick = {filterData}
                    > Отфильтровать 
                    </button>
                </div>
            </div>
        )
    }
}

export default Table
