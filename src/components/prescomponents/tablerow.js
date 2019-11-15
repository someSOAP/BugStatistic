import React from 'react'
import moment from "moment"

// Компонента создаёт строку в таблице 
// с колонками из параметра args
const Row = ({args}) => 
    <tr>
        {
            args.map((value, index) =>
                <td key={index}>{moment(value, moment.ISO_8601).isValid() ? moment(value).format("DD.MM.YYYY") : value}</td>
            )
        }
    </tr>
export default Row