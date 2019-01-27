import React from 'react'


// Компонента создаёт строку в таблице 
// с колонками из параметра args
const Row = ({args}) => 
    <tr>
        {
            args.map(argument => 
                <td>{argument}</td>    
            )
        }
    </tr>
export default Row