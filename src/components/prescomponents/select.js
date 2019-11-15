import React from 'react'
import { Form } from 'react-bootstrap'
import * as C from '../../constants'

//компоненты выпадающий список. По умолчанию содержит значение "- не выбрано -" и остальные, которые в него подаём через props
const Select = ({ options, title, onSelect =f=>f }) => {
    return(
        <Form.Group>
            <Form.Label>{ title }</Form.Label>
            <Form.Control as="select" onChange = { onSelect }>
                <option key = {'empty'} value = {C.empty}>{C.empty}</option>
                {options ?
                    options.map(
                        (option, i) =>
                            <option key = {i} value = {option}>{option}</option>
                    ) : null
                }
            </Form.Control>
        </Form.Group>
    )
}

export default Select