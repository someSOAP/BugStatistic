import React            from 'react'
import Row              from './tablerow'
import * as TableF      from '../../functions/tablefunctions'

const { valuesToArray, attrsToArray, formatStr, createFilterField } = TableF


const Table = ({headrows, rows, options, filters, dateValues, title }) => {
    return(
        <div>
            <h2>{title}</h2>
            <table className='table table-striped table-reflow'>
                <thead className = 'thead-dark'>
                    {
                        attrsToArray(headrows[0]).map((attr, i) => 
                                <th>
                                    {/* <div className = 'mt-1'>{formatStr(attr)}</div> */}
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
        </div>
    )
}
    
export default Table
