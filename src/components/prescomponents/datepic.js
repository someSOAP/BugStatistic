import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru/'
import "react-datepicker/dist/react-datepicker.css";



const DatePic = ({selected, onChange = f=>f, placeholder = ''}) => {
    registerLocale('ru', ru)
    return <DatePicker 
                onChange                = {onChange}
                selected                = {selected}
                dateFormat              = "dd.MM.yyyy"
                todayButton             = {"Сегодня"}
                locale                  = "ru"
                dropdownMode            = "select"
                yearDropdownItemNumber  = {5}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                placeholderText = {placeholder}
            />
        
} 
export default DatePic