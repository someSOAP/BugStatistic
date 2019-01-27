import React from 'react'
import * as C from '../../constants'

const Select = ({ options, onSelect =f=>f }) => {
    return(
            <select className = 'custom-select' onChange = {onSelect}>
                <option key = {'empty'} value = {C.empty}>{C.empty}</option>
                {options ?
                    options.map(
                        (option, i) =>
                            <option key = {i} value = {option}>{option}</option>
                    ) : null
                }
            </select>

    )
}

export default Select