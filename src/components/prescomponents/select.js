import React from 'react'
import * as C from '../../constants'

const Select = ({ label, options, onSelect =f=>f }) => {
    return(
        <label>{label ? label + ": " : ""}
            <select className = 'ReactSelect' onChange = {onSelect}>
                <option key = {'empty'}>{C.empty}</option>
                {options ?
                    options.map(
                        (option, i) =>
                            <option key = {i}>{option}</option>
                    ) : null
                }
            </select>
        </label>
    )
}

export default Select