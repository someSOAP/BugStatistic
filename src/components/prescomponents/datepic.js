import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


// Компонент выбора даты с заданными по-умолчанию настройками
const DatePic = ({selected, onChange = f=>f, placeholder = ''}) => {
    return <DatePicker 
                onChange                = {onChange}
                selected                = {selected}
                dateFormat              = "dd.MM.yyyy"
                todayButton             = {"Сегодня"}
                dropdownMode            = "select"
                className               = "form-control form-control-sm"
                yearDropdownItemNumber  = {5}
                isClearable             = {true}
                placeholderText = {placeholder}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
            />
        
} 
export default DatePic