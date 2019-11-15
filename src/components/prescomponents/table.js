import React            from 'react'
import Row              from './tablerow'
import * as TableF      from '../../functions/tablefunctions'
import { empty }        from '../../constants'
import Pagination       from '../pagination'
import $                from 'jquery'

const { valuesToArray, formatStr, createFilterField } = TableF

// функция по очистке фильтров таблицы
// в данном случае, использовать jQuery оказалось проще,
// чем задействовать React для очистки значений полей фильтрации в этой компоненте

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
                <table className='table table-bordered table-striped table-hover'>
                    <thead className = 'thead-dark'>
                        <tr>
                            {
                                Object.keys(headrows[0]).map((attr, i) =>
                                        <th scope="col" key={i}>
                                            {formatStr(attr)}
                                            {createFilterField(attr, options, filters, dateValues, i)}
                                        </th>
                                )
                            }
                        </tr>
                    </thead>
                    {
                        (rows.length) ? 
                    <tbody>
                        {
                            rows.map((row, key) => <Row args={valuesToArray(row)} key={key}/>)
                        }
                    </tbody> : 
                    <div>
                        <h1>Данные не найдены</h1>
                    </div>
                    }
                </table>
                <div className="btn-group float-left">
                    <Pagination 
                        openPage ={openPage}
                        pageCount = {pageCount}
                        pageSelected = {pageSelected}
                    />
                </div>
                <div className="btn-group float-right" role="group" aria-label="Basic example">
                    <button 
                        type="button"
                        className="btn btn-secondary"
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
                        className="btn btn-secondary"
                        onClick = {filterData}
                    > Отфильтровать 
                    </button>
                </div>
            </div>
        )
    }
}

export default Table
