import React            from 'react'
import Row              from './tablerow'
import * as TableF      from '../../functions/tablefunctions'

const { valuesToArray, attrsToArray, formatStr, createFilterField } = TableF


const Table = ({headrows, rows, options, filters, dateValues, title }) => {
    return(
        <div>
            <h2>{title}</h2>
            <table className='ReactTable'>
                <thead>
                    {
                        attrsToArray(headrows[0]).map(attr => 
                                <th>
                                    <label>
                                        {formatStr(attr)}
                                        {createFilterField(attr, options, filters, dateValues)}
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
