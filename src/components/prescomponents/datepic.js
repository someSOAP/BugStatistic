import React from 'react'
import _DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";

// Компонент выбора даты с заданными по-умолчанию настройками
const DatePicker = ({selected, title, onChange = f=>f, placeholder = ''}) => {
    return (
        <Form.Group>
            <Form.Label>{ title }</Form.Label>
            <br/>
            <_DatePicker
                onChange                = {onChange}
                selected                = {selected}
                dateFormat              = "dd.MM.yyyy"
                todayButton             = {"Сегодня"}
                dropdownMode            = "select"
                className               = "form-control"
                yearDropdownItemNumber  = {5}
                isClearable             = {true}
                placeholderText = {placeholder}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
            />
        </Form.Group>
        )

        
} 
export default DatePicker