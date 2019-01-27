import React from 'react'
import * as C from '../../constants'

//компоненты выпадающий список. По умолчанию содержит значение "- не выбрано -" и остальные, которые в него подаём через props
const Select = ({ options, onSelect =f=>f }) => {
    return(
            <select className = 'form-control form-control-sm' onChange = {onSelect}>
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