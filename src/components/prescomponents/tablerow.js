import React from 'react'

const Row = ({args}) => 
    <tr>
        {
            args.map(argument => 
                <td>{argument}</td>    
            )
        }
    </tr>
export default Row